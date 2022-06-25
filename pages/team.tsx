import Header from '../lib/components/landing-page/Header';
import Footer from '../lib/components/landing-page/Footer';
import Card from '../lib/components/landing-page/team-page/Card'
import ProfileMobile from '../lib/components/landing-page/profileMobile'

const Team: React.FC = () => {
  return (
    <div>
      <Header />
      <div className="grid grid-rows-3 space-y-20 p-10 bg-white">
        <div className="container flex space-x-20 px-24">

        <Card
        name="Dog"
        role="Software developer"
        img="https://www.kindacode.com/wp-content/uploads/2022/05/cute.jpeg"
        class="2026"
        github="https://iconmonstr.com/linkedin-2-svg/"
        linkedin="https://iconmonstr.com/linkedin-2-svg/"/>

        <Card 
        name="Dog"
        role="Software developer"
        img="https://www.kindacode.com/wp-content/uploads/2022/05/cute.jpeg"
        class="2026"
        github="https://iconmonstr.com/linkedin-2-svg/"
        linkedin="https://iconmonstr.com/linkedin-2-svg/"/>

        <Card 
        name="Dog"
        role="Software developer"
        img="https://www.kindacode.com/wp-content/uploads/2022/05/cute.jpeg"
        class="2026"
        github="https://iconmonstr.com/linkedin-2-svg/"
        linkedin="https://iconmonstr.com/linkedin-2-svg/"/>

        </div>
        <ProfileMobile />
      </div>

      <Footer />
    </div>
  )

}

export default Team;