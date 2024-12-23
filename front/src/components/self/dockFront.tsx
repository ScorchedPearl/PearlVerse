"use client"
import React, { useCallback } from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconExchange,
  IconHome,
  IconNewSection,
  IconTerminal2,
} from "@tabler/icons-react";
import Image from "next/image";
import { TokenResponse, useGoogleLogin } from "@react-oauth/google";
import { graphqlClient } from "../../../clients/api";
import { verifyUserGoogleTokenQuery } from "../../../graphql/query/user";
import { redirect } from "next/navigation";

export function FloatingDockFront() {
  const googlelogin = useGoogleLogin({
    onSuccess: (cred:TokenResponse) => {
      console.log(cred);
      handleLoginGoogle(cred);
    },
    onError: () => console.log('Login Failed'),
    scope: 'openid profile email',
  });
  const handleLoginGoogle=useCallback(async (cred:TokenResponse)=>{
    const googleToken=cred.access_token
    console.log(googleToken);
    const { verifyGoogleToken } = await graphqlClient.request(verifyUserGoogleTokenQuery,{token:googleToken});
    console.log(verifyGoogleToken);
    if(verifyGoogleToken){
      window.localStorage.setItem("__PostPearl_Token",verifyGoogleToken);
      redirect("/");
    }
  },[])
  const links = [
    {
      title: "Home",
      icon: (
        <IconHome className=" text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },

    {
      title: "Spaces",
      icon: (
        <IconTerminal2 className=" text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/space",
    },
    {
      title: "Avatars",
      icon: (
        <IconNewSection className=" text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/avatar",
    },
    {
      title: "Aceternity UI",
      icon: (
        <Image
          src="https://assets.aceternity.com/logo-dark.png"
          width={20}
          height={20}
          alt="Aceternity Logo"
        />
      ),
      href: "#",
    },
    {
      title: "Changelog",
      icon: (
        <IconExchange className=" text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },

    {
      title: "Google",
      icon: (
        <IconBrandGoogle  onClick={()=>googlelogin()} className=" text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/",
    },
    {
      title: "GitHub",
      icon: (
        <IconBrandGithub className=" text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/signin",
    },
  ];
  return (
    <div className="flex items-center justify-center h-[6rem] relative top-10 left-[450px]  w-full">
      <FloatingDock
        mobileClassName="translate-y-20" // only for demo, remove for production
        items={links}
      />
    </div>
  );
}
