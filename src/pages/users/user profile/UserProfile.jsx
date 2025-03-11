import { useState } from "react"
import { useSelector } from "react-redux"
import ProfileForm from "./components/ProfileForm"
import OrderHistory from "./components/OrdersHistory"
import BookedCarsHistory from "./components/BookedCarsHistory"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FileEdit, Clock, Car } from "lucide-react"

// Create a wrapper component that safely uses Redux
function UserProfileContent() {
  const auth = useSelector((state) => state.auth) || { user: null }
  const { user } = auth
  const languageState = useSelector((state) => state.language) || { language: "en" }
  const { language } = languageState

  // Translations
  const translations = {
    en: {
      title: "User Profile",
      profile: "Profile",
      orders: "Orders History",
      bookings: "Booked Cars",
      welcome: "Welcome back",
    },
    ar: {
      title: "الملف الشخصي",
      profile: "الملف الشخصي",
      orders: "سجل الطلبات",
      bookings: "السيارات المحجوزة",
      welcome: "مرحبا بعودتك",
    },
  }

  const t = translations[language] || translations.en

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Card className="w-full max-w-md">
          <CardContent className="p-6">
            <p className="text-center">Please login to view your profile</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="mb-8">
        <CardHeader className="pb-4">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user.image || "/placeholder.svg?height=80&width=80"} alt={user.name} />
              <AvatarFallback>{user.name?.charAt(0) || "U"}</AvatarFallback>
            </Avatar>
            <div className="space-y-1 text-center md:text-left">
              <CardTitle className="text-2xl">
                {t.welcome}, {user.name}
              </CardTitle>
              <p className="text-muted-foreground">{user.email}</p>
              <p className="text-sm text-muted-foreground">{user.role === "admin" ? "Administrator" : "Client"}</p>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <FileEdit className="h-4 w-4" />
            <span>{t.profile}</span>
          </TabsTrigger>
          <TabsTrigger value="orders" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{t.orders}</span>
          </TabsTrigger>
          <TabsTrigger value="bookings" className="flex items-center gap-2">
            <Car className="h-4 w-4" />
            <span>{t.bookings}</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <ProfileForm />
        </TabsContent>

        <TabsContent value="orders">
          <OrderHistory />
        </TabsContent>

        <TabsContent value="bookings">
          <BookedCarsHistory />
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Main component that handles Redux store access safely
export default function UserProfile() {
  // Check if we're in a browser environment and if Redux is available
  const [hasReduxError, setHasReduxError] = useState(false)

  if (hasReduxError) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Card>
          <CardHeader>
            <CardTitle>Redux Connection Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Unable to connect to Redux store. Make sure your component is wrapped in a Redux Provider.</p>
            <div className="mt-4 p-4 bg-muted rounded-md">
              <pre className="text-sm">
                {`// In your main app file (e.g., App.jsx or index.jsx):
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      {/* Your app components */}
    </Provider>
  );
}`}
              </pre>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Try to render the component, catch Redux errors
  try {
    return <UserProfileContent />
  } catch (error) {
    console.error("Redux error:", error)
    setHasReduxError(true)
    return null
  }
}

