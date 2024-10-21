import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function TermsAndConditions() {
  return (
    
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      <Link to="/">
        <Button variant="ghost" size="sm">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </Link>

      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Terms of Use</h1>

        <p className="text-muted-foreground">
          Welcome to ConnectED. By using our service, you agree to these terms. Please read them carefully.
        </p>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">1. Acceptance of Terms</h2>
          <p>
            By accessing connectEd.com, you accept these terms and our Privacy Policy. If you disagree, please do not use our service.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">2. Use of Service</h2>
          <p>
            You may use ConnectED for personal, non-commercial purposes. Do not misuse our service or assist anyone in doing so.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">3. User Content</h2>
          <p>
            You retain ownership of content you submit, but grant us a license to use it. You're responsible for your content and must have necessary rights to it.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">4. Intellectual Property</h2>
          <p>
            ConnectED's content and trademarks are our exclusive property. Don't use them without our permission.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">5. Privacy</h2>
          <p>
            Our Privacy Policy explains how we handle your personal data and protect your privacy when you use our Service.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">6. Disclaimer of Warranties</h2>
          <p>
            ConnectED is provided "as is" without any warranties, express or implied.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">7. Limitation of Liability</h2>
          <p>
            ConnectED won't be liable for any indirect, incidental, special, consequential, or punitive damages.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">8. Changes to Terms</h2>
          <p>
            We may modify these terms. We'll post notice of modifications on this page.
          </p>
        </section>

        <p className="text-sm text-muted-foreground">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>

    </div>
  )
}