"use client"
import { LinkedinLogoIcon, XLogoIcon, GooglePodcastsLogoIcon, GithubLogoIcon } from "@phosphor-icons/react"
import { BBH_Sans_Bartle } from "next/font/google"

const bbhSansBartle = BBH_Sans_Bartle({
  weight: '400',
  subsets: ['latin']
})

export default function Header() {
  return (
    <div className="py-6 px-8 flex justify-center lg:justify-between items-center">
      <div className="hidden lg:flex space-x-4">
        <LinkedinLogoIcon size={22} />
        <XLogoIcon size={22} />
      </div>
      <p className={`${bbhSansBartle.className} text-md md:text-xl lg:text-2xl `}>Rudraditya Thakur</p>
      <div className="hidden lg:flex space-x-4">
        <GithubLogoIcon size={22} />
        <GooglePodcastsLogoIcon size={22} />
      </div>
    </div>
  )
}