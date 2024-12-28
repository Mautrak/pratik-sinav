import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserPlus, UserMinus, Check, X } from "lucide-react";

interface Profile {
  id: string;
  username: string;
  full_name: string;
  avatar_url: string;
}

interface Friendship {
  id: string;
  user_id: string;
  friend_id: string;
  status: string;
  friend: Profile;
}

const Friends = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Profile[]>([]);
  const [friends, setFriends] = useState<Friendship[]>([]);
  const [pendingRequests, setPendingRequests] = useState<Friendship[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchFriends();
    fetchPendingRequests();
  }, []);

  const fetchFriends = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("friendships")
        .select(`
          id,
          user_id,
          friend_id,
          status,
          friend:profiles!friendships_friend_id_fkey(
            id,
            username,
            full_name,
            avatar_url
          )
        `)
        .eq("user_id", user.id)
        .eq("status", "accepted");

      if (error) throw error;
      setFriends(data || []);
    } catch (error) {
      console.error("Error fetching friends:", error);
      toast({
        variant: "destructive",
        title: "Hata",
        description: "Arkadaş listesi yüklenirken bir hata oluştu.",
      });
    }
  };

  const fetchPendingRequests = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("friendships")
        .select(`
          id,
          user_id,
          friend_id,
          status,
          friend:profiles!friendships_user_id_fkey(
            id,
            username,
            full_name,
            avatar_url
          )
        `)
        .eq("friend_id", user.id)
        .eq("status", "pending");

      if (error) throw error;
      setPendingRequests(data || []);
    } catch (error) {
      console.error("Error fetching pending requests:", error);
    } finally {
      setLoading(false);
    }
  };

  const searchUsers = async (term: string) => {
    if (term.length < 3) {
      setSearchResults([]);
      return;
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("profiles")
        .select("id, username, full_name, avatar_url")
        .neq("id", user.id)
        .ilike("username", `%${term}%`)
        .limit(5);

      if (error) throw error;
      setSearchResults(data || []);
    } catch (error) {
      console.error("Error searching users:", error);
    }
  };

  const sendFriendRequest = async (friendId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase.from("friendships").insert({
        user_id: user.id,
        friend_id: friendId,
        status: "pending",
      });

      if (error) throw error;

      toast({
        title: "Başarılı",
        description: "Arkadaşlık isteği gönderildi.",
      });
      setSearchResults([]);
      setSearchTerm("");
    } catch (error) {
      console.error("Error sending friend request:", error);
      toast({
        variant: "destructive",
        title: "Hata",
        description: "Arkadaşlık isteği gönderilirken bir hata oluştu.",
      });
    }
  };

  const handleFriendRequest = async (friendshipId: string, accept: boolean) => {
    try {
      const { error } = await supabase
        .from("friendships")
        .update({ status: accept ? "accepted" : "rejected" })
        .eq("id", friendshipId);

      if (error) throw error;

      toast({
        title: "Başarılı",
        description: accept
          ? "Arkadaşlık isteği kabul edildi."
          : "Arkadaşlık isteği reddedildi.",
      });

      fetchPendingRequests();
      if (accept) fetchFriends();
    } catch (error) {
      console.error("Error handling friend request:", error);
      toast({
        variant: "destructive",
        title: "Hata",
        description: "İstek işlenirken bir hata oluştu.",
      });
    }
  };

  const removeFriend = async (friendshipId: string) => {
    try {
      const { error } = await supabase
        .from("friendships")
        .delete()
        .eq("id", friendshipId);

      if (error) throw error;

      toast({
        title: "Başarılı",
        description: "Arkadaş listeden kaldırıldı.",
      });

      fetchFriends();
    } catch (error) {
      console.error("Error removing friend:", error);
      toast({
        variant: "destructive",
        title: "Hata",
        description: "Arkadaş kaldırılırken bir hata oluştu.",
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Arkadaşlar</h1>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Arkadaş Ara</CardTitle>
            <CardDescription>
              Kullanıcı adına göre arkadaş arayın
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Input
                placeholder="Kullanıcı adı..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  searchUsers(e.target.value);
                }}
              />
            </div>

            {searchResults.length > 0 && (
              <div className="mt-4">
                <Table>
                  <TableBody>
                    {searchResults.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="flex items-center gap-4">
                          <Avatar>
                            <AvatarImage src={user.avatar_url} />
                            <AvatarFallback>
                              {user.username?.[0]?.toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{user.username}</p>
                            <p className="text-sm text-muted-foreground">
                              {user.full_name}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => sendFriendRequest(user.id)}
                          >
                            <UserPlus className="h-4 w-4 mr-2" />
                            Ekle
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {pendingRequests.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Arkadaşlık İstekleri</CardTitle>
              <CardDescription>
                Bekleyen arkadaşlık istekleri
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableBody>
                  {pendingRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="flex items-center gap-4">
                        <Avatar>
                          <AvatarImage src={request.friend.avatar_url} />
                          <AvatarFallback>
                            {request.friend.username?.[0]?.toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{request.friend.username}</p>
                          <p className="text-sm text-muted-foreground">
                            {request.friend.full_name}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-2 justify-end">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleFriendRequest(request.id, true)}
                          >
                            <Check className="h-4 w-4 mr-2" />
                            Kabul Et
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleFriendRequest(request.id, false)}
                          >
                            <X className="h-4 w-4 mr-2" />
                            Reddet
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Arkadaş Listesi</CardTitle>
            <CardDescription>
              Tüm arkadaşlarınız
            </CardDescription>
          </CardHeader>
          <CardContent>
            {friends.length === 0 ? (
              <p className="text-center text-muted-foreground py-4">
                Henüz arkadaşınız yok
              </p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Kullanıcı</TableHead>
                    <TableHead>İşlemler</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {friends.map((friendship) => (
                    <TableRow key={friendship.id}>
                      <TableCell className="flex items-center gap-4">
                        <Avatar>
                          <AvatarImage src={friendship.friend.avatar_url} />
                          <AvatarFallback>
                            {friendship.friend.username?.[0]?.toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">
                            {friendship.friend.username}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {friendship.friend.full_name}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeFriend(friendship.id)}
                        >
                          <UserMinus className="h-4 w-4 mr-2" />
                          Kaldır
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Friends;