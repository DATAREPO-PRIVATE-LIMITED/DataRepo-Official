import React from "react";
import Apis from "./Apis";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "./ui/button";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const Market = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSignup = () => {
    navigate("/signup");
  };

  return (
    <>
      <Apis />

      {/* Sign Up Call to Action */}
    <div className="mt-28 mb-15">
          {!user && (
        <Card className="text-center w-[55%] mx-auto ">
          <CardHeader>
            <CardTitle className="text-2xl">Ready to Start Building?</CardTitle>
            <p className="text-muted-foreground">
              Join thousands of developers using our APIs to build amazing
              applications and services.
            </p>
          </CardHeader>
          <CardContent>
            <Button onClick={handleSignup} size="lg">
              Start Building Today
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
    </>
  );
};

export default Market;
