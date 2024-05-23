import "./Info.css";
import axios from "axios";
import { useState } from "react";
const Info = ( {activeComponent, setActiveComponent,userData}) => {
  const [pdf, setPdf] = useState(null);
  const [selected, setSelected] = useState('Education');

    const handleSelect = (item) => {
        setSelected(item);
        setActiveComponent(item);
    };

    const items = [
        { name: 'Education', key: 'Education' },
        { name: 'Projects', key: 'Projects' },
        { name: 'Work Experience', key: 'Experience' },
        { name: 'Certifications', key: 'Certifications' },
    ];
 async  function  downloadResume(data) {
    if(data.name.trim() === "" || data.city.trim() === "" || data.state.trim() === "" || data.phone.trim() === "" || data.email.trim() === "") {  
      alert('Please fill all the fields in the personal information section');
      return;
    }
    if(data.education.length === 0) {
      alert('Please add atleast one education field');
      return;
    }
    if(data.projects.length === 0) {
      alert('Please add atleast one project field');
      return;
    }
    if(data.coursework){
      if(data.coursework.length === 0) {
        alert('Please add atleast one coursework field');
        return;
      }
    }
    
    const isEducationEmpty = data.education.some(field => (
      field.college.trim() === "" ||
      field.cgpa.trim() === "" ||
      field.startDate.trim() === "" ||
      field.endDate.trim() === "" ||
      field.degree.trim() === "" ||
      field.city.trim() === "" 
    ));
  
    if (isEducationEmpty) {
      alert('Please fill all the fields in the education section');
      return;
    }
    const isProjectEmpty = data.projects.some(field => (  
      field.name.trim() === "" ||
      field.techStack.trim() === "" ||
      field.date.trim() === "" 
    ));
    if(isProjectEmpty) {
      alert('Please fill all the fields in the project section');
      return;
    }
    if(data.internships.length >0) {
      const isInternshipEmpty = data.internships.some(field => (
        field.company.trim() === "" ||
        field.role.trim() === "" ||
        field.startDate.trim() === "" ||
        field.endDate.trim() === "" 
      ));
      if(isInternshipEmpty) {
        alert('Please fill all the fields in the internship section');
        return;
      }
    }
    if(data.extracurricular){
      if(data.extracurricular.length>0){
        const isExtracurricularEmpty = data.extracurricular.some(field => (
          field.name.trim() === "" ||
          field.role.trim() === "" ||
          field.startDate.trim() === "" ||
          field.endDate.trim() === "" ||
          field.description.trim() === "" ||
          field.location.trim() === "" 
        ));
        if(isExtracurricularEmpty) {
          alert('Please fill all the fields in the extracurricular section');
          return;
        }
      }
    }
    if(data.certifications){
      if(data.certifications.length>0){
        const isCertificationEmpty = data.certifications.some(field => (
          field.name.trim() === "" 
        ));
        if(isCertificationEmpty) {
          alert('Please fill all the fields in the certification section');
          return;
        }
      }
    }
    
    try {
      const response = await axios.post('http://localhost:3000/resume/generate-pdf', { userData: data }, { responseType: 'blob' });
      const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
      setPdf(URL.createObjectURL(pdfBlob));
      console.log(URL.createObjectURL(pdfBlob));
      const link = document.createElement('a');
      link.href = pdf;
      link.download = 'resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error fetching PDF:', error);
    }
  }

  return (
    <div className="main-page">
      <div className="menu-wrapper">
        <div className="menu">
          <div className="experience">
            <div className="div1" />
            <div className="designer-info">
              <div className="salmaan-ahmed">{userData.name}</div>
              <div className="uiux-designer">UI/UX Designer</div>
              <div className="meenakshi-college-of1">
                Meenakshi College of Engineering
              </div>
            </div>
          </div>
          <div className="download">
            <button className="button" onClick={()=>downloadResume(userData)}>
              <div className="download-resume">Download Resume</div>
              <div className="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M5.90057 11.8C7.07213 12.9716 8.97163 12.9716 10.1432 11.8L10.1433 11.8L12.2846 9.65866C12.6819 9.27497 12.6929 8.64191 12.3092 8.24466C11.9255 7.84741 11.2924 7.83641 10.8952 8.22009C10.8868 8.22812 10.8786 8.23634 10.8706 8.24466L9.01526 10.0993L8.99991 1C8.99991 0.447719 8.55219 0 7.99991 0C7.44763 0 6.99991 0.447719 6.99991 1L7.01391 10.0847L5.17326 8.244C4.77601 7.86031 4.14294 7.87131 3.75926 8.26856C3.38498 8.65609 3.38498 9.27047 3.75926 9.658L5.90057 11.8Z"
                    fill="#FCF5FE"
                  />
                  <path
                    d="M15 9.66666C14.4477 9.66666 14 10.1144 14 10.6667V13.7273C13.9996 13.8777 13.8778 13.9996 13.7273 14H2.27266C2.12222 13.9996 2.00034 13.8777 2 13.7273V10.6667C2 10.1144 1.55228 9.66666 1 9.66666C0.447719 9.66666 0 10.1144 0 10.6667V13.7273C0.00146875 14.9819 1.01812 15.9985 2.27266 16H13.7273C14.9819 15.9985 15.9985 14.9819 16 13.7273V10.6667C16 10.1144 15.5523 9.66666 15 9.66666Z"
                    fill="#FCF5FE"
                  />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>
      <div className="footer">
            {items.map((item) => (
                <div
                    key={item.key}
                    className={`footer-item ${selected === item.key ? 'selected' : ''}`}
                    onClick={() => handleSelect(item.key)}
                >
                    <div className="footer-text">{item.name}</div>
                    {selected === item.key && <div className="underline"></div>}
                </div>
            ))}
        </div>
    </div>
  );
};

export default Info;
