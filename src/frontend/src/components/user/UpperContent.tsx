import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from '@/hooks/use-auth';
import { Skeleton } from '@/components/ui/skeleton';

const UpperContent: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { data, isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (data) {
      setIsLoading(false);
    }
  }, [data]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    console.log('Searching for:', searchQuery);
  };

  if (isLoading) {
    return <UpperContentSkeleton />;
  }

  return (
    <Card className="w-full  mx-auto mt-10  ">
      <CardContent className="p-8">
        <div className="mb-8 text-center ">
          <h2 className="text-2xl font-bold text-primary mb-2">
            Welcome, {data?.name?.split(' ')[0]}!
          </h2>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            Discover tailored scholarships, internships, and OJT opportunities. 
            Your journey to success begins here.
          </p>
        </div>
        <div className="flex items-center space-x-4 ">
          <Avatar className="h-10 w-10 border- border-primary">
            {data?.avatarUrl ? (
              <AvatarImage src={data.avatarUrl} alt={data.name || 'User Avatar'} />
            ) : (
              <AvatarFallback className="bg-primary-foreground text-primary font-semibold">
                {data?.name ? data.name.charAt(0) : 'U'}
              </AvatarFallback>
            )}
          </Avatar>
          <div className="flex-grow relative ">
            <Input
              type="text"
              placeholder="Search for opportunities..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full bg-primary-foreground dark:bg-slate-800 pr-10 focus-visible:ring-primary rounded-lg"
            />
            <Button 
              onClick={handleSearch} 
              size="icon" 
              variant="ghost" 
              className="absolute right-0 top-0 bottom-0"
            >
              <Search className="h-5 w-5 text-muted-foreground" />
              <span className="sr-only">Search</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

function UpperContentSkeleton() {
  return (
    <Card className="w-full max-w-4xl mx-auto mt-8 bg-background/80 backdrop-blur-sm shadow-lg">
      <CardContent className="p-8">
        <div className="mb-8 text-center">
          <Skeleton className="h-8 w-64 mx-auto mb-2" />
          <Skeleton className="h-4 w-full max-w-2xl mx-auto" />
          <Skeleton className="h-4 w-3/4 max-w-2xl mx-auto mt-1" />
        </div>
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <Skeleton className="h-10 flex-grow" />
        </div>
      </CardContent>
    </Card>
  );
}

export default UpperContent;