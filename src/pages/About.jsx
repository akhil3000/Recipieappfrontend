import aboutPhoto from "./assets/Akhil.png"
import "./Home.css"
export const About=()=>{
    return <div className="about-us">
    <img src={aboutPhoto} alt="Akhil Polisetty" className="about-photo" />
    <h1>Akhil Polisetty</h1>
     
    
    <div className="author-info">
      <h3>JNTUK 2022 CS Grad</h3>
      <h3>Scaler Academy 2024 Grad</h3>
      <h3>FullStackWebDeveloper,DataScience & Web 3 Enthusiast</h3>
      <h3>gmail:akhilpolisetty456@gmail.com</h3>
    </div>
    </div>
    
    
    }