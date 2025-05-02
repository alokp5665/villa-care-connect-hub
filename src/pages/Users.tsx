
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { User, UserRole } from "@/types";
import { getUsersByRole, users } from "@/utils/dummyData";
import { Edit, MoreHorizontal, Plus, Search, Trash, UserPlus } from "lucide-react";
import { useState } from "react";

const Users = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<User[]>(users);
  
  const { toast } = useToast();
  
  // Filter users when search query changes
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      setFilteredUsers(users);
      return;
    }
    
    const query = searchQuery.toLowerCase();
    const filtered = users.filter(user => 
      user.name.toLowerCase().includes(query) || 
      user.email.toLowerCase().includes(query) ||
      (user.phone && user.phone.includes(query))
    );
    
    setFilteredUsers(filtered);
  };
  
  // Handle user actions
  const handleEditUser = (user: User) => {
    toast({
      title: "Edit User",
      description: `Editing user: ${user.name}`,
    });
  };
  
  const handleDeleteUser = (user: User) => {
    toast({
      title: "Delete User",
      description: `Would you like to delete user: ${user.name}?`,
      variant: "destructive",
    });
  };
  
  const handleAddUser = () => {
    toast({
      title: "Add User",
      description: "User creation form would open here.",
    });
  };
  
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(new Date(date));
  };
  
  // Get users by role
  const adminUsers = getUsersByRole(UserRole.ADMIN);
  const managerUsers = getUsersByRole(UserRole.MANAGER);
  const technicianUsers = getUsersByRole(UserRole.TECHNICIAN);
  const customerUsers = getUsersByRole(UserRole.CUSTOMER);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Users</h1>
          <p className="text-muted-foreground">Manage users and their access permissions.</p>
        </div>
        <Button onClick={handleAddUser}>
          <UserPlus className="h-4 w-4 mr-2" />
          Add User
        </Button>
      </div>
      
      {/* Search bar */}
      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSearch} className="flex space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button type="submit">Search</Button>
          </form>
        </CardContent>
      </Card>
      
      {/* Role-based tabs */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Users</TabsTrigger>
          <TabsTrigger value={UserRole.ADMIN}>Admins</TabsTrigger>
          <TabsTrigger value={UserRole.MANAGER}>Managers</TabsTrigger>
          <TabsTrigger value={UserRole.TECHNICIAN}>Technicians</TabsTrigger>
          <TabsTrigger value={UserRole.CUSTOMER}>Customers</TabsTrigger>
        </TabsList>
        
        {/* All Users */}
        <TabsContent value="all">
          <UserTable 
            users={filteredUsers} 
            onEdit={handleEditUser} 
            onDelete={handleDeleteUser} 
            formatDate={formatDate} 
          />
          
          {filteredUsers.length === 0 && (
            <div className="py-8 text-center">
              <p className="text-muted-foreground">No users found matching your search.</p>
            </div>
          )}
        </TabsContent>
        
        {/* Admins */}
        <TabsContent value={UserRole.ADMIN}>
          <UserTable 
            users={adminUsers} 
            onEdit={handleEditUser} 
            onDelete={handleDeleteUser}
            formatDate={formatDate}
          />
          
          {adminUsers.length === 0 && (
            <div className="py-8 text-center">
              <p className="text-muted-foreground">No administrators found.</p>
            </div>
          )}
        </TabsContent>
        
        {/* Managers */}
        <TabsContent value={UserRole.MANAGER}>
          <UserTable 
            users={managerUsers} 
            onEdit={handleEditUser} 
            onDelete={handleDeleteUser}
            formatDate={formatDate}
          />
          
          {managerUsers.length === 0 && (
            <div className="py-8 text-center">
              <p className="text-muted-foreground">No managers found.</p>
            </div>
          )}
        </TabsContent>
        
        {/* Technicians */}
        <TabsContent value={UserRole.TECHNICIAN}>
          <Card>
            <CardHeader>
              <CardTitle>Technicians</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {technicianUsers.map((technician) => (
                  <Card key={technician.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-center space-x-4">
                        {technician.avatar ? (
                          <img 
                            src={technician.avatar} 
                            alt={technician.name} 
                            className="h-12 w-12 rounded-full"
                          />
                        ) : (
                          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-primary font-semibold text-lg">
                              {technician.name.charAt(0)}
                            </span>
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold truncate">{technician.name}</h3>
                          <p className="text-sm text-muted-foreground">{technician.email}</p>
                          {technician.phone && (
                            <p className="text-sm text-muted-foreground">{technician.phone}</p>
                          )}
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleEditUser(technician)}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDeleteUser(technician)}>
                              <Trash className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t">
                        <p className="text-sm">
                          <span className="font-medium">Member since:</span> {formatDate(technician.createdAt)}
                        </p>
                        {technician.location && (
                          <p className="text-sm mt-1">
                            <span className="font-medium">Location:</span> {`${technician.location.lat.toFixed(5)}, ${technician.location.lng.toFixed(5)}`}
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {technicianUsers.length === 0 && (
                <div className="py-8 text-center">
                  <p className="text-muted-foreground">No technicians found.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Customers */}
        <TabsContent value={UserRole.CUSTOMER}>
          <UserTable 
            users={customerUsers} 
            onEdit={handleEditUser} 
            onDelete={handleDeleteUser}
            formatDate={formatDate}
          />
          
          {customerUsers.length === 0 && (
            <div className="py-8 text-center">
              <p className="text-muted-foreground">No customers found.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
  formatDate: (date: Date) => string;
}

const UserTable = ({ users, onEdit, onDelete, formatDate }: UserTableProps) => {
  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    {user.avatar ? (
                      <img 
                        src={user.avatar} 
                        alt={user.name} 
                        className="h-8 w-8 rounded-full mr-3"
                      />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                        <span className="text-primary font-semibold">
                          {user.name.charAt(0)}
                        </span>
                      </div>
                    )}
                    {user.name}
                  </div>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell className="capitalize">{user.role}</TableCell>
                <TableCell>{formatDate(user.createdAt)}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => onEdit(user)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onDelete(user)}>
                        <Trash className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default Users;
