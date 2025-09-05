
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Heart, MessageSquare, Search, Users, PlusCircle } from "lucide-react";
import { useState } from "react";

const communityPosts: any[] = [
  // {
  //   id: 1,
  //   author: "Jane Doe",
  //   avatar: "https://i.pravatar.cc/150?u=jane.doe@example.com",
  //   time: "2 hours ago",
  //   content: "Just completed a mindfulness session using one of the recommended apps. Feeling so much calmer now. It's amazing how a few minutes of deep breathing can change your whole outlook.",
  //   likes: 12,
  //   comments: 3,
  // },
  // {
  //   id: 2,
  //   author: "David Lee",
  //   avatar: "https://i.pravatar.cc/150?u=david.lee@example.com",
  //   time: "5 hours ago",
  //   content: "Struggling with motivation today. Any tips for getting out of a slump when you have a lot to do?",
  //   likes: 5,
  //   comments: 8,
  // },
];

const communityGroups: any[] = [
  // {
  //   name: "Anxiety Support Group",
  //   members: 128,
  //   description: "A safe space to share and learn about managing anxiety.",
  //   dataAiHint: "support group"
  // },
  // {
  //   name: "Mindful Living",
  //   members: 250,
  //   description: "For anyone interested in practicing mindfulness and meditation.",
  //   dataAiHint: "meditation group"
  // },
  // {
  //   name: "Recovery Circle",
  //   members: 75,
  //   description: "Support and encouragement for those on the path to recovery.",
  //   dataAiHint: "recovery journey"
  // },
]

export default function CommunityPage() {
  const [posts, setPosts] = useState(communityPosts);
  const [groups, setGroups] = useState(communityGroups);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
      <div className="md:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Create a Post</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea placeholder="Share your thoughts with the community..." className="mb-4" rows={4} />
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> Post
            </Button>
          </CardContent>
        </Card>
        
        <Tabs defaultValue="recent">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="recent">Recent</TabsTrigger>
              <TabsTrigger value="popular">Popular</TabsTrigger>
              <TabsTrigger value="my-posts">My Posts</TabsTrigger>
            </TabsList>
            <div className="relative w-full max-w-xs">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search posts..." className="pl-8" />
            </div>
          </div>
          <TabsContent value="recent" className="space-y-4">
            {posts.length > 0 ? posts.map(post => (
              <Card key={post.id}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={post.avatar} alt={post.author}/>
                      <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{post.author}</p>
                      <p className="text-xs text-muted-foreground">{post.time}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{post.content}</p>
                </CardContent>
                 <CardContent className="flex items-center gap-4 pt-4">
                  <Button variant="ghost" size="sm" className="flex items-center gap-1">
                    <Heart className="h-4 w-4" /> {post.likes}
                  </Button>
                  <Button variant="ghost" size="sm" className="flex items-center gap-1">
                    <MessageSquare className="h-4 w-4" /> {post.comments}
                  </Button>
                </CardContent>
              </Card>
            )) : (
              <Card>
                <CardContent className="py-8 text-center text-muted-foreground">
                  No recent posts. Start the conversation!
                </CardContent>
              </Card>
            )}
          </TabsContent>
          <TabsContent value="popular">
             <p className="text-muted-foreground text-center py-8">Popular posts will be displayed here.</p>
          </TabsContent>
          <TabsContent value="my-posts">
             <p className="text-muted-foreground text-center py-8">Your posts will be displayed here.</p>
          </TabsContent>
        </Tabs>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Featured Groups</CardTitle>
            <CardDescription>Find a group that fits your needs and join the conversation.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {groups.length > 0 ? groups.map(group => (
               <div key={group.name} className="flex items-start gap-4 p-2 rounded-lg hover:bg-muted">
                    <div className="bg-primary/10 text-primary p-2 rounded-lg">
                        <Users className="h-6 w-6"/>
                    </div>
                    <div className="flex-grow">
                        <p className="font-semibold">{group.name}</p>
                        <p className="text-sm text-muted-foreground">{group.members} members</p>
                    </div>
                    <Button variant="outline" size="sm">Join</Button>
                </div>
            )) : (
              <div className="text-center text-muted-foreground py-4">
                No featured groups available.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
