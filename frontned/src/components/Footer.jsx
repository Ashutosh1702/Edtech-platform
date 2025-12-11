import { useNavigate } from "react-router-dom";
import nimishaImg from "../assets/nimisha.jpg";
import kiranpreetImg from "../assets/kiranpreet.jpg";
import alokImg from "../assets/alok.jpg";
import avinashImg from "../assets/avinash.jpg";
import ashutoshImg from "../assets/ashutosh.webp";
import nityaImg from "../assets/nitya.jpg";
import saketImg from "../assets/saket.png";
import sunidhiImg from "../assets/sunidhi.webp";

const instructors = [
  {
    id: 1,
    name: "Nimisha Singh Ma'am",
    specialization: "JavaScript & Web Development",
    course: "Introduction to JavaScript",
    image: nimishaImg,
  },
  {
    id: 2,
    name: "Kiranpreet Kaur Ma'am",
    specialization: "Python Programming",
    course: "Advanced Python Programming",
    image: kiranpreetImg,
  },
  {
    id: 3,
    name: "Alok Sir",
    specialization: "Cloud Computing",
    course: "Cloud Computing Essentials",
    image: alokImg,
  },
  {
    id: 4,
    name: "Avinash Sir",
    specialization: "Cybersecurity",
    course: "Cybersecurity Basics",
    image: avinashImg,
  },
  {
    id: 101,
    name: "Ashutosh Sir",
    specialization: "React & Frontend",
    course: "Advanced React",
    image: ashutoshImg,
  },
  {
    id: 102,
    name: "Nitya Singh Ma'am",
    specialization: "Java & System Design",
    course: "Java (Intermediate to Advanced)",
    image: nityaImg,
  },
  {
    id: 103,
    name: "Saket Sir",
    specialization: "Backend Development",
    course: "Spring Boot, Node.js, MongoDB",
    image: saketImg,
  },
  {
    id: 106,
    name: "Sunidhi Ma'am",
    specialization: "SQL & Data Analysis",
    course: "SQL Fundamentals to Advanced",
    image: sunidhiImg,
  },
];

function Footer() {
  const navigate = useNavigate();

  const handleInstructorClick = (instructorId) => {
    // Find the course for this instructor
    const courseMap = {
      1: 1, 2: 2, 3: 3, 4: 4, 101: 101, 102: 102, 103: 103, 106: 106
    };
    const courseId = courseMap[instructorId];
    if (courseId) {
      // We need to get the course data - for now, navigate to courses page
      navigate(`/course/${courseId}`);
    }
  };

  return (
    <footer className="bg-gradient-to-b from-slate-900 to-slate-950 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Instructors Section */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-white mb-2 text-center">Meet Our Expert Instructors</h3>
          <p className="text-slate-400 text-center mb-8 max-w-2xl mx-auto">
            Learn from industry experts with years of experience in their respective fields
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {instructors.map((instructor) => (
              <div
                key={instructor.id}
                onClick={() => handleInstructorClick(instructor.id)}
                className="group cursor-pointer bg-slate-800/50 hover:bg-slate-800 rounded-lg p-4 transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <div className="w-16 h-16 mx-auto mb-3 rounded-full overflow-hidden border-2 border-slate-700 group-hover:border-blue-500 transition-colors">
                  <img
                    src={instructor.image}
                    alt={instructor.name}
                    className="w-full h-full object-cover"
                    style={{
                      objectPosition: instructor.name.includes('Kiranpreet') ? 'center top' :
                                     instructor.name.includes('Ashutosh') ? 'center 25%' :
                                     instructor.name.includes('Nitya Singh') ? 'center top' :
                                     instructor.name.includes('Saket') ? 'center top' : 'center'
                    }}
                  />
                </div>
                <h4 className="text-sm font-semibold text-white text-center mb-1 group-hover:text-blue-400 transition-colors">
                  {instructor.name.split(' ')[0]}
                </h4>
                <p className="text-xs text-slate-400 text-center line-clamp-2">
                  {instructor.specialization}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="font-bold text-white mb-4 text-xl">MyEdTech</h4>
            <p className="text-sm text-slate-400 mb-4">
              Empowering learners with world-class education from industry experts. Build your skills and advance your career with our comprehensive courses.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <p className="font-semibold text-white mb-4">Quick Links</p>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="text-slate-400 hover:text-white transition-colors">Home</a>
              </li>
              <li>
                <a href="/courses" className="text-slate-400 hover:text-white transition-colors">All Courses</a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">About Us</a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">Contact Us</a>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-semibold text-white mb-4">Categories</p>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">Web Development</a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">Backend Development</a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">Cloud Computing</a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">Data & Analytics</a>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-semibold text-white mb-4">Newsletter</p>
            <p className="text-sm text-slate-400 mb-3">
              Stay updated with our latest courses and offers
            </p>
            <div className="flex flex-col gap-2">
              <input
                className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="Enter your email"
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-slate-400 text-center md:text-left">
              Copyright © 2024 MyEdTech. All Rights Reserved.
            </p>
            <div className="flex gap-6 text-xs text-slate-400">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
