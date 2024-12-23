'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Search, Plus, LogIn, Clock, User, ChevronRight } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from 'next/link'


const mySpaces = [
  { id: 1, name: "My Awesome Space", members: 42, link: `/space/${1}` },
  { id: 2, name: "Project X", members: 15, link: `/space/${2}` },
  { id: 3, name: "Chill Zone", members: 78, link: `/space/${3}` },
]

const recentSpaces = [
  { id: 4, name: "Tech Talks", members: 120, link: `/space/${4}` },
  { id: 5, name: "Gaming Arena", members: 56, link: `/space/${5}` },
  { id: 6, name: "Art Gallery", members: 89, link: `/space/${6}` },
]

export default function MetaversePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [joinCode, setJoinCode] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Searching for:', searchQuery)
    // Implement search functionality here
  }

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Joining space with code:', joinCode)
    // Implement join by code functionality here
  }

  const handleCreate = () => {
    console.log('Creating new space')
    // Implement create new space functionality here
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Metaverse Space</h1>
      
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Large sidebar with the three options */}
        <Card className="lg:w-2/3">
          <CardHeader>
            <CardTitle>Metaverse Options</CardTitle>
            <CardDescription>Search, join, or create spaces</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">Search Spaces</h3>
                <form onSubmit={handleSearch} className="flex flex-col space-y-2">
                  <Input
                    type="text"
                    placeholder="Search spaces..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Button type="submit" className="w-full">
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                </form>
              </div>

              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">Join by Code</h3>
                <form onSubmit={handleJoin} className="flex flex-col space-y-2">
                  <Input
                    type="text"
                    placeholder="Enter space code..."
                    value={joinCode}
                    onChange={(e) => setJoinCode(e.target.value)}
                  />
                  <Button type="submit" className="w-full">
                    <LogIn className="h-4 w-4 mr-2" />
                    Join
                  </Button>
                </form>
              </div>

              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">Create New Space</h3>
                <Button onClick={handleCreate} className="w-full h-[76px]">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Space
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Combined My Spaces and Recent Spaces */}
        <Card className="lg:w-1/3">
          <CardHeader>
            <CardTitle>Your Spaces</CardTitle>
            <CardDescription>Manage and explore your metaverse spaces</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="my-spaces">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="my-spaces">My Spaces</TabsTrigger>
                <TabsTrigger value="recent">Recent</TabsTrigger>
              </TabsList>
              <TabsContent value="my-spaces">
                <ul className="space-y-2 mt-2">
                  {mySpaces.map(space => (
                    <li key={space.id} className="flex justify-between items-center p-2 hover:bg-gray-100 rounded cursor-pointer">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-gray-500" />
                        <span className="truncate"><Link href={space.link}>{space.name}</Link></span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500 whitespace-nowrap">{space.members} members</span>
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                      </div>
                    </li>
                  ))}
                </ul>
              </TabsContent>
              <TabsContent value="recent">
                <ul className="space-y-2 mt-2">
                  {recentSpaces.map(space => (
                    <li key={space.id} className="flex justify-between items-center p-2 hover:bg-gray-100 rounded cursor-pointer">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span className="truncate"><Link href={space.link}>{space.name}</Link></span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500 whitespace-nowrap">{space.members} members</span>
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                      </div>
                    </li>
                  ))}
                </ul>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

