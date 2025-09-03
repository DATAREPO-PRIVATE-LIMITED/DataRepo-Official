import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { ExternalLink, Zap, Globe, BookOpen, Copy, Key } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "./ui/button";
import { getAllApi, getSingleApi } from "../utils/userApi";

const Store = () => {
  const [singleApi, setsingleApi] = useState(null);
  const [copiedApiId, setCopiedApiId] = useState(null);
  const [copiedApiKeyId, setCopiedApiKeyId] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  // generating api key
  const [generatingKey, setgeneratingKey] = useState(false);

  // handle generate key

  const hanldeGenerateKey = () => {
    setgeneratingKey(true);
    {singleApi?  setgeneratingKey(false) : null}
  };

  // handle copy api key

  const handleCopyApiKey = async (url, apiId) => {
    if (!apiId) return;
    try {
      if (navigate.clipboard && window.isSecureContext) {
        await navigate.clipboard.writeText(url);
      }

      setCopiedApiKeyId(apiId);
      setTimeout(() => setCopiedApiKeyId(null), 2000)
    } catch (error) {
      console.log("unable copy apiKey , try gain !", error);
    }
  };

  //handle copy url
  const handleCopyUrl = async (url, apiId) => {
    if (!url) return;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(url);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = url;
        textarea.style.position = "fixed";
        textarea.style.left = "-9999px";
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setCopiedApiId(apiId);
      setTimeout(() => setCopiedApiId(null), 2000);
    } catch (err) {
      console.error("Failed to copy URL: ", err);
    }
  };

  //fetching the api
  useEffect(() => {
    let fetchApi = async (id) => {
      try {
        let data = await getSingleApi(id);
        return setsingleApi(data);
      } catch (error) {
        console.log("eeror while fetching the api", error);
      }
    };
    fetchApi();
  }, []);

  console.log("api --> ", singleApi);

  return (
    <>
      {/* API Cards Section */}
        <h2 className="flex flex-row justify-center items-center mt-15 text-3xl font-bold text-center mb-8">
          Generate Your Api Key
        </h2>

      <div className="mt-20 w-[90%] mx-auto mb-15 ">
      
        <div className=" mt-16  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl mb-2">
                    {singleApi?.name}
                  </CardTitle>
                  <Badge variant="secondary" className="mb-2">
                    {singleApi?.category}
                  </Badge>
                </div>
                <Badge variant="outline" className="text-xs">
                  v{singleApi?.version || "1.0"}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Description */}
              <p className="text-muted-foreground text-sm leading-relaxed">
                {singleApi?.description}
              </p>

              {/* Features */}
              {Array.isArray(singleApi?.tags) && singleApi?.tags.length > 0 && (
                <div>
                  <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    Tags
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {singleApi?.tags.slice(0, 3).map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* API Details */}
              <div className="space-y-2 flex flex-row justify-around items-center gap-2 mt-7 ml-[-22px]">
                
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">Pricing Model:</span>
                  <Badge variant="default" className="text-xs">
                    {singleApi?.priceModel}
                  </Badge>
                </div>
                {singleApi?.rateLimit ? (
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-muted-foreground">Rate Limit:</span>
                    <Badge variant="secondary" className="text-xs">
                      {singleApi?.rateLimit} req/min
                    </Badge>
                  </div>
                ) : null}
              </div>
            </CardContent>
          </Card>

          {/* generate api key btn  */}
          <div className="flex flex-col mt-5 items-center  justify-center  space-y-2 gap-15">
            <Button onClick={() => hanldeGenerateKey()}>
              Generate Api Key
            </Button>
            <div>
              { generatingKey ? (
                <div>Loading....</div>
              ) :""}
            </div>

            {/* show keys */}
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-2 text-sm">
                <Key className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Api Key:</span>
                <span className="font-mono text-xs break-all flex-1">
                  {singleApi?.baseUrl}
                </span>
                <Button
                  onClick={() =>
                    handleCopyApiKey(singleApi?.baseUrl, singleApi?._id)
                  }
                  variant="ghost"
                  size="sm"
                  className={`h-6 px-2 py-0 hover:bg-muted ${
                    copiedApiKeyId === singleApi?._id ? "text-green-600" : ""
                  }`}
                  title={
                    copiedApiKeyId === singleApi?._id ? "Copied!" : "Copy URL"
                  }
                >
                  {copiedApiKeyId === singleApi?._id ? (
                    <span className="text-xs">Copied!</span>
                  ) : (
                    <Copy className="h-3 w-3" />
                  )}
                </Button>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Base Url:</span>
                <span className="font-mono text-xs break-all flex-1">
                  {singleApi?.baseUrl}
                </span>
                <Button
                  onClick={() =>
                    handleCopyUrl(singleApi?.baseUrl, singleApi?._id)
                  }
                  variant="ghost"
                  size="sm"
                  className={`h-6 px-2 py-0 hover:bg-muted ${
                    copiedApiId === singleApi?._id ? "text-green-600" : ""
                  }`}
                  title={
                    copiedApiId === singleApi?._id ? "Copied!" : "Copy URL"
                  }
                >
                  {copiedApiId === singleApi?._id ? (
                    <span className="text-xs">Copied!</span>
                  ) : (
                    <Copy className="h-3 w-3" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Store;
