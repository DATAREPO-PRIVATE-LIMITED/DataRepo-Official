import React,{ useState,useEffect} from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { ExternalLink, Zap, Globe, BookOpen, Copy } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "./ui/button";
import { getAllApi } from "../utils/userApi";

const Apis = () => {
  const [apiList, setApiList] = useState(null);
  const [copiedApiId, setCopiedApiId] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleStoreRedirect = () => {
    navigate("/store");
  };

  const handleDocumentation = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCopyUrl = async (url, apiId) => {
    if (!url) return;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(url);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = url;
        textarea.style.position = 'fixed';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopiedApiId(apiId);
      setTimeout(() => setCopiedApiId(null), 2000);
    } catch (err) {
      console.error('Failed to copy URL: ', err);
    }
  };


//fetching apis

   useEffect(() => {
      const fetchApis = async () => {
        try {
          const data = await getAllApi();
          setApiList(data);
        } catch (error) {
          console.log("error while fetching apis list ", error);
        }
      };
      fetchApis();
    }, []);

     console.log('apiList', apiList)


  if (apiList === null) {
    return (
      <div className="mt-20 w-[90%] mx-auto mb-15">
        <h2 className="text-3xl font-bold text-center mb-8">Available APIs</h2>
        <p className="text-center text-muted-foreground">Loading APIs...</p>
      </div>
    );
  }
  return (
    <>
      {/* API Cards Section */}
      <div className="mt-20 w-[90%] mx-auto mb-15">
        <h2 className="text-3xl font-bold text-center mb-8">Available APIs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(apiList || []).map((api) => (
            <Card
              key={api._id}
              className="hover:shadow-lg transition-shadow duration-300"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl mb-2">{api.name}</CardTitle>
                    <Badge variant="secondary" className="mb-2">
                      {api.category}
                    </Badge>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    v{api.version || "1.0"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Description */}
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {api.description}
                </p>

                {/* Features */}
                {Array.isArray(api.tags) && api.tags.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                      <Zap className="h-4 w-4" />
                      Tags
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {api.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* API Details */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Base URL:</span>
                    <span className="font-mono text-xs break-all flex-1">
                      {api.baseUrl}
                    </span>
                    <Button
                      onClick={() => handleCopyUrl(api.baseUrl, api._id)}
                      variant="ghost"
                      size="sm"
                      className={`h-6 px-2 py-0 hover:bg-muted ${copiedApiId === api._id ? 'text-green-600' : ''}`}
                      title={copiedApiId === api._id ? 'Copied!' : 'Copy URL'}
                    >
                      {copiedApiId === api._id ? (
                        <span className="text-xs">Copied!</span>
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}
                    </Button>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-muted-foreground">Pricing Model:</span>
                    <Badge variant="default" className="text-xs">
                      {api.priceModel}
                    </Badge>
                  </div>
                  {api.rateLimit ? (
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-muted-foreground">Rate Limit:</span>
                      <Badge variant="secondary" className="text-xs">
                        {api.rateLimit} req/min
                      </Badge>
                    </div>
                  ) : null}
                </div>

                {/* Documentation & Try Now */}
                <div className="pt-2 space-y-3">
                  <Button
                    onClick={() => handleDocumentation(api.docsUrl)}
                    variant="outline"
                    className="w-full"
                    size="sm"
                  >
                    <BookOpen className="h-4 w-4 mr-2" />
                    Documentation
                  </Button>
                  <Button
                    onClick={handleStoreRedirect}
                    className="w-full"
                    size="sm"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Try Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        {Array.isArray(apiList) && apiList.length === 0 && (
          <p className="text-center text-muted-foreground mt-6">No APIs available yet.</p>
        )}
      </div>
    </>
  );
};

export default Apis;
