"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { motion } from "motion/react";
import { ArrowRight, Code, Smartphone, Palette, Users, Star, Mail, Phone, MapPin, Zap } from "lucide-react";

export default function Page() {
  const services = [
    {
      icon: <Code className="h-8 w-8" />,
      title: "Websites",
      description: "Modern, responsive websites built with cutting-edge technologies for optimal performance."
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: "Mobile Apps",
      description: "Native and cross-platform mobile applications that deliver exceptional user experiences."
    },
    {
      icon: <Palette className="h-8 w-8" />,
      title: "Branding",
      description: "Complete brand identity solutions that capture your vision and resonate with your audience."
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "UX Design",
      description: "User-centered design approaches that create intuitive and engaging digital experiences."
    }
  ];

  const caseStudies = [
    {
      title: "EduFlow",
      category: "Student Startup",
      description: "Course scheduling platform helping students optimize their academic planning and workload management.",
      image: "https://images.unsplash.com/photo-1732115234692-3ee71d5363af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwc3R1ZGVudHMlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc1ODU3MzA2NHww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      title: "CampusConnect",
      category: "Mobile App",
      description: "Student community platform connecting peers with real-time updates and social features.",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXZlbG9wbWVudHxlbnwxfHx8fDE3NTg1ODU3OTB8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      title: "ResearchHub",
      category: "Web Platform",
      description: "Collaborative research platform streamlining academic partnerships and project management.",
      image: "https://images.unsplash.com/photo-1603985585179-3d71c35a537c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXNpZ24lMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzU4NjE3OTMwfDA&ixlib=rb-4.1.0&q=80&w=1080"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Martinez",
      role: "Founder, EcoTech Solutions",
      content: "StudentInnovation transformed our sustainability startup idea into a fully functional platform. Their expertise in both design and development was invaluable.",
      rating: 5
    },
    {
      name: "Dr. Michael Chen",
      role: "Professor, Computer Science",
      content: "The team delivered exceptional work on our research collaboration portal. Professional, timely, and exceeded our expectations.",
      rating: 5
    },
    {
      name: "Jessica Williams",
      role: "Student Entrepreneur",
      content: "They helped bring our business plan to life with an amazing mobile app. The user experience is seamless and our customers love it.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-slate-600 to-slate-800 rounded-lg flex items-center justify-center">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl text-black font-semibold">StudentInnovation</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#about" className="text-gray-700 hover:text-black transition-colors">About</a>
              <a href="#services" className="text-gray-700 hover:text-black transition-colors">Services</a>
              <a href="#case-studies" className="text-gray-700 hover:text-black transition-colors">Case Studies</a>
              <a href="#contact" className="text-gray-700 hover:text-black transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl mb-6 text-black max-w-4xl mx-auto leading-tight">
              We Build Digital Solutions for <span className="text-slate-600">Student Entrepreneurs</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Empowering student entrepreneurs and innovators with cutting-edge web and mobile applications that turn ideas into reality.
            </p>
            <Button size="lg" className="bg-black hover:bg-gray-800 text-white px-8 py-3 text-lg">
              Start Your Project
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl mb-6 text-black">Our Mission</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              StudentInnovation bridges the gap between academic excellence and real-world application. 
              We&#39;re a student-led organization dedicated to creating digital solutions that support 
              student entrepreneurship, foster innovation, and bring ambitious ideas to life. 
              Our team combines cutting-edge technology with deep understanding of the student entrepreneur&#39;s journey.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl mb-6 text-black">What We Do</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From concept to deployment, we deliver comprehensive digital solutions tailored to your needs.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow border-2 hover:border-slate-200">
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 p-3 bg-slate-50 rounded-lg w-fit text-slate-600">
                      {service.icon}
                    </div>
                    <CardTitle className="text-xl text-black">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600 text-center">
                      {service.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section id="case-studies" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl mb-6 text-black">Our Work</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Real projects that showcase our commitment to student innovation and entrepreneurship.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <motion.div
                key={study.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow overflow-hidden">
                  <div className="aspect-video overflow-hidden">
                    <ImageWithFallback 
                      src={study.image}
                      alt={study.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader>
                    <div className="text-sm text-slate-600 mb-2">{study.category}</div>
                    <CardTitle className="text-xl text-black">{study.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600">
                      {study.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl mb-6 text-black">What People Say</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Don&#39;t just take our word for it - hear from our satisfied clients and partners.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full">
                  <CardContent className="pt-6">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-slate-400 text-slate-400" />
                      ))}
                    </div>
                    <p className="text-gray-600 mb-6 italic">&ldquo;{testimonial.content}&rdquo;</p>
                    <div>
                      <div className="text-black">{testimonial.name}</div>
                      <div className="text-sm text-gray-500">{testimonial.role}</div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section id="contact" className="py-20 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl mb-6">Ready to Innovate?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Let&#39;s discuss your project and turn your ideas into reality. 
              Whether you&#39;re a student entrepreneur or innovator, we&#39;re here to help.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button size="lg" className="bg-slate-600 hover:bg-slate-700 text-white px-8 py-3">
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black px-8 py-3">
                View Our Portfolio
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-8 text-left max-w-3xl mx-auto">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-slate-400" />
                <div>
                  <div className="text-sm text-gray-400">Email</div>
                  <div>hello@studentinnovation.com</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-slate-400" />
                <div>
                  <div className="text-sm text-gray-400">Phone</div>
                  <div>(555) 123-INNOVATE</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-slate-400" />
                <div>
                  <div className="text-sm text-gray-400">Location</div>
                  <div>Student Innovation Hub</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-6 h-6 bg-gradient-to-br from-slate-400 to-slate-600 rounded flex items-center justify-center">
                <Zap className="h-4 w-4 text-white" />
              </div>
              <span className="text-xl text-white">StudentInnovation</span>
            </div>
            <div className="text-center md:text-right">
              <p>&copy; 2024 StudentInnovation. All rights reserved.</p>
              <p className="text-sm mt-1">Empowering student entrepreneurs worldwide</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}