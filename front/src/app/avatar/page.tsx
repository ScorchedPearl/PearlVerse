"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"

const avatars = [
  { id: 1, src: "/placeholder.svg?height=400&width=200", alt: "Avatar 1" },
  { id: 2, src: "/placeholder.svg?height=400&width=200", alt: "Avatar 2" },
  { id: 3, src: "/placeholder.svg?height=400&width=200", alt: "Avatar 3" },
  { id: 4, src: "/placeholder.svg?height=400&width=200", alt: "Avatar 4" },
  { id: 5, src: "/placeholder.svg?height=400&width=200", alt: "Avatar 5" },
  { id: 6, src: "/placeholder.svg?height=400&width=200", alt: "Avatar 6" },
]

export default function AvatarSelectionPage() {
  const [selectedAvatar, setSelectedAvatar] = useState<number | null>(null)

  const handleAvatarSelect = (id: number) => {
    setSelectedAvatar(id)
  }

  const handleConfirm = () => {
    if (selectedAvatar) {
      alert(`Avatar ${selectedAvatar} selected!`)
      // Here you would typically save the selection or navigate to the next page
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-7xl h-[95vh] flex flex-col">
        <CardHeader>
          <CardTitle className="text-4xl font-bold">Select Your Avatar</CardTitle>
          <CardDescription className="text-xl">Choose an avatar for your game character</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow overflow-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center mt-2">
            {avatars.map((avatar) => (
              <Button
                key={avatar.id}
                variant="outline"
                className={`p-2 h-auto w-full max-w-[240px] aspect-[1/2] ${
                  selectedAvatar === avatar.id ? "ring-4 ring-primary" : ""
                }`}
                onClick={() => handleAvatarSelect(avatar.id)}
              >
                <div className="relative w-full h-full rounded-md overflow-hidden">
                  <Image
                    src={avatar.src}
                    alt={avatar.alt}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={handleConfirm} disabled={!selectedAvatar} size="lg" className="text-xl py-6 px-8">
            Confirm Selection
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

