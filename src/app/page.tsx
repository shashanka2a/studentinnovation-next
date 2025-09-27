"use client"
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { motion } from "motion/react";
import { ArrowRight, Code, Smartphone, Palette, Users, Mail, Phone, MapPin, Lightbulb, Sprout, Loader2 } from "lucide-react";

function BulbSproutIcon({ className = "" }: { className?: string }) {
  return (
    <span className={`relative inline-flex items-center justify-center ${className}`}>
      <Lightbulb className="h-5 w-5 text-white" />
      <Sprout className="h-3 w-3 text-emerald-300 absolute" />
    </span>
  );
}

export default function Page() {
  const [isLoading, setIsLoading] = useState(false);

  const handleGetStarted = () => {
    setIsLoading(true);
    // Simulate a brief loading state for better UX
    setTimeout(() => {
      window.location.href = '/signup';
    }, 800);
  };

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
      title: "GatorEx",
      category: "Marketplace",
      description: "Marketplace for UF students",
      image: "/GatorEx.png",
      link: "https://www.gatorex.shop/",
    },
    {
      title: "Rydify",
      category: "Ride Sharing",
      description: "Split ride costs effortlessly",
      image: "/Rydify.png",
      link: "https://rydify.co",
    },
    {
      title: "Vybr",
      category: "Housing Platform",
      description: "Discover your dream housing",
      image: "/Vybr.png",
      link: "https://www.vybr.club/",
    },
  ];

  

  

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-slate-600 to-slate-800 rounded-lg flex items-center justify-center">
                <BulbSproutIcon />
              </div>
              <span className="text-xl text-black font-semibold">gatorinnovation</span>
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
              Build your MVP fast
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Professional landing pages in 2 days or full applications in 1 week. Simple scope, quick delivery, great UX.
            </p>
            
            {/* Project Type Selection */}
            <div className="mb-8 max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-blue-200">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">🚀</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Landing Page</h3>
                    <p className="text-gray-600 mb-4">Perfect for launching your idea quickly</p>
                    <div className="text-2xl font-bold text-blue-600 mb-2">$500</div>
                    <div className="text-sm text-gray-500">Ready in 2 days</div>
                  </CardContent>
                </Card>
                
                <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-purple-200">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">💻</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Full Application</h3>
                    <p className="text-gray-600 mb-4">Complete web or mobile app</p>
                    <div className="text-2xl font-bold text-purple-600 mb-2">$2,500</div>
                    <div className="text-sm text-gray-500">Ready in 1 week</div>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <Button 
              size="lg" 
              className="bg-black hover:bg-gray-800 text-white px-8 py-3 text-lg transition-all duration-300" 
              onClick={handleGetStarted}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Getting Started...
                </>
              ) : (
                <>
                  Start your project
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Our Work (moved here) */}
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
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Real projects that showcase our commitment to student innovation and entrepreneurship.</p>
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
                    <CardDescription className="text-gray-600">{study.description}</CardDescription>
                    <div className="border-t mt-6 pt-4">
                      <a
                        href={study.link}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
                      >
                        View Live Project <ArrowRight className="h-4 w-4" />
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
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
              gatorinnovation bridges the gap between academic excellence and real-world application. 
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

      

      {/* Testimonials temporarily removed for MVP */}

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
              <Button 
                size="lg" 
                className="bg-slate-600 hover:bg-slate-700 text-white px-8 py-3 transition-all duration-300" 
                onClick={handleGetStarted}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Getting Started...
                  </>
                ) : (
                  <>
                    Get Started Today
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-black px-8 py-3 transition-all duration-300"
                onClick={() => document.getElementById('case-studies')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View Our Portfolio
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-8 text-left max-w-3xl mx-auto">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-slate-400" />
                <div>
                  <div className="text-sm text-gray-400">Email</div>
                  <div>hello@gatorinnovation.com</div>
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
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Company Info */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-slate-600 to-slate-800 rounded-lg flex items-center justify-center">
                  <BulbSproutIcon />
                </div>
                <span className="text-xl text-white">gatorinnovation</span>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                Empowering student entrepreneurs and business owners with cutting-edge web and mobile applications.
              </p>
              <div className="flex space-x-4">
                <Button 
                  size="sm" 
                  className="bg-white text-black hover:bg-gray-200 transition-all duration-300"
                  onClick={handleGetStarted}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Starting...
                    </>
                  ) : (
                    'Start Your Project'
                  )}
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="border-gray-600 text-gray-300 hover:bg-gray-800 transition-all duration-300"
                  onClick={() => document.getElementById('case-studies')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  View Our Work
                </Button>
              </div>
            </div>

            {/* Our Projects */}
            <div>
              <h3 className="text-white font-semibold mb-4">Our Projects</h3>
              <div className="space-y-3">
                <a 
                  href="https://www.gatorex.shop/" 
                  target="_blank" 
                  rel="noreferrer noopener"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  GatorEx Marketplace
                </a>
                <a 
                  href="https://www.vybr.club/" 
                  target="_blank" 
                  rel="noreferrer noopener"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Vybr Housing Platform
                </a>
                <a 
                  href="https://rydify.co" 
                  target="_blank" 
                  rel="noreferrer noopener"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Rydify Ride Sharing
                </a>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-white font-semibold mb-4">Contact</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>hello@gatorinnovation.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>(555) 123-INNOVATE</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>Student Innovation Hub</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-center md:text-left">
                <p>&copy; 2024 gatorinnovation. All rights reserved.</p>
                <p className="text-sm mt-1">Empowering student entrepreneurs worldwide</p>
              </div>
              <div className="mt-4 md:mt-0">
                <Button 
                  size="sm" 
                  className="bg-black hover:bg-gray-800 text-white transition-all duration-300"
                  onClick={handleGetStarted}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Getting Started...
                    </>
                  ) : (
                    <>
                      Get Started Today
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}