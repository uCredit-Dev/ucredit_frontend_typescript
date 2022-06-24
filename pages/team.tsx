import Header from '../lib/components/landing-page/Header';
import Footer from '../lib/components/landing-page/Footer';
import Card from '../lib/components/landing-page/team-page/Card'


const Team: React.FC = () => {
  return (
    <div>
      <Header />
      <div className="flex justify-between space-x-20 p-10 bg-white">

        <Card 
        name="dog"
        role="software developer"
        img="https://www.kindacode.com/wp-content/uploads/2022/05/cute.jpeg"
        class="2025"
        github="https://iconmonstr.com/linkedin-2-svg/"
        linkedin="https://iconmonstr.com/linkedin-2-svg/"/>
        <Card 
        name="dog"
        role="software developer"
        img="https://www.kindacode.com/wp-content/uploads/2022/05/cute.jpeg"
        class="2025"
        github="https://iconmonstr.com/linkedin-2-svg/"
        linkedin="https://iconmonstr.com/linkedin-2-svg/"/>

        <Card 
        name="dog"
        role="software developer"
        img="https://www.kindacode.com/wp-content/uploads/2022/05/cute.jpeg"
        class="2025"
        github="https://iconmonstr.com/linkedin-2-svg/"
        linkedin="https://iconmonstr.com/linkedin-2-svg/"/>

      </div>

      <Footer />
    </div>
  )

}

export default Team;