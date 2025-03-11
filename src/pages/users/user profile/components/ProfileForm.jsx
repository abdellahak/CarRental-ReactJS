import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Upload } from "lucide-react"

export default function ProfileForm() {
  // Safely access Redux store
  const authState = useSelector((state) => state.auth) || { user: null }
  const user = authState.user || {}

  const languageState = useSelector((state) => state.language) || { language: "en" }
  const language = languageState.language || "en"

  // Get dispatch function safely
  const dispatch = useDispatch()

  // Translations
  const translations = {
    en: {
      title: "Profile Information",
      description: "Update your personal information",
      name: "Full Name",
      email: "Email Address",
      phone: "Phone Number",
      address: "Address",
      cin: "CIN/ID Number",
      uploadPhoto: "Upload Photo",
      save: "Save Changes",
      cancel: "Cancel",
      success: "Profile updated successfully",
      error: "Failed to update profile",
    },
    ar: {
      title: "معلومات الملف الشخصي",
      description: "تحديث معلوماتك الشخصية",
      name: "الاسم الكامل",
      email: "البريد الإلكتروني",
      phone: "رقم الهاتف",
      address: "العنوان",
      cin: "رقم البطاقة الوطنية",
      uploadPhoto: "تحميل صورة",
      save: "حفظ التغييرات",
      cancel: "إلغاء",
      success: "تم تحديث الملف الشخصي بنجاح",
      error: "فشل تحديث الملف الشخصي",
    },
  }

  const t = translations[language] || translations.en

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
    cin: user?.cin || "",
    image: user?.image || "",
  })

  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          image: reader.result,
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Update user in Redux
      dispatch({
        type: "UPDATE_USER",
        payload: {
          ...user,
          ...formData,
        },
      })

      // Update auth state to reflect changes
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          ...user,
          ...formData,
        },
      })

      alert(t.success) // Using alert instead of toast for simplicity
    } catch (error) {
      alert(t.error)
      console.error("Error updating profile:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>{t.title}</CardTitle>
          <CardDescription>{t.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center space-y-4 mb-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={formData.image || "/placeholder.svg?height=96&width=96"} alt={formData.name} />
              <AvatarFallback>
                <User className="h-12 w-12" />
              </AvatarFallback>
            </Avatar>

            <div className="flex items-center">
              <Label
                htmlFor="picture"
                className="cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md flex items-center gap-2"
              >
                <Upload className="h-4 w-4" />
                {t.uploadPhoto}
              </Label>
              <Input id="picture" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">{t.name}</Label>
              <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">{t.email}</Label>
              <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">{t.phone}</Label>
              <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cin">{t.cin}</Label>
              <Input id="cin" name="cin" value={formData.cin} onChange={handleChange} />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="address">{t.address}</Label>
              <Textarea id="address" name="address" value={formData.address} onChange={handleChange} rows={3} />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" type="button">
            {t.cancel}
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : t.save}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}

