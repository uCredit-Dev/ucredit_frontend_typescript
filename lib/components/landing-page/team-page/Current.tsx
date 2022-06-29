import Card from './Card';

function Current() {
  return (
    <div className="container mx-auto">
      <div className="grid sm:grid-cols-2 md:grid-cols-3">

        <div className="flex justify-center p-6">
          <Card
            name="Dog"
            role="Software developer"
            img="https://www.kindacode.com/wp-content/uploads/2022/05/cute.jpeg"
            class="2026"
            github="https://iconmonstr.com/linkedin-2-svg/"
            linkedin="https://iconmonstr.com/linkedin-2-svg/"/>
        </div>

        <div className="flex justify-center p-6">
          <Card
            name="Dog"
            role="Software developer"
            img="https://www.kindacode.com/wp-content/uploads/2022/05/cute.jpeg"
            class="2026"
            github="https://iconmonstr.com/linkedin-2-svg/"
            linkedin="https://iconmonstr.com/linkedin-2-svg/"/>
        </div>

        <div className="flex justify-center p-6">
          <Card
          name="Dog"
          role="Software developer"
          img="https://www.kindacode.com/wp-content/uploads/2022/05/cute.jpeg"
          class="2026"
          github="https://iconmonstr.com/linkedin-2-svg/"
          linkedin="https://iconmonstr.com/linkedin-2-svg/"/>
        </div>
      </div>
    </div>
  )

}

export default Current;