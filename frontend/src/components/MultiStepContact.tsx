import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  ArrowLeft, 
  User, 
  Building, 
  Briefcase, 
  CheckCircle,
  Mail,
  Phone,
  MapPin,
  Globe,
  Users,
  Target,
  Calendar,
  DollarSign,
  FileText,
  Check,
  Loader2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useAutoSave } from '../hooks/useAutoSave';
import config from '../config';

interface FormData {
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  jobTitle: string;
  
  // Company Information
  companyName: string;
  companySize: string;
  industry: string;
  website: string;
  country: string;
  
  // Project Details
  service: string;
  budget: string;
  timeline: string;
  goals: string;
  challenges: string;
  
  // Additional Info
  message: string;
  howHeard: string;
  preferredContact: string;
}

const MultiStepContact: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    jobTitle: '',
    companyName: '',
    companySize: '',
    industry: '',
    website: '',
    country: '',
    service: '',
    budget: '',
    timeline: '',
    goals: '',
    challenges: '',
    message: '',
    howHeard: '',
    preferredContact: 'email',
  });

  const totalSteps = 4;

  const steps = [
    { id: 1, name: 'Personal', icon: User, description: 'Your contact information' },
    { id: 2, name: 'Company', icon: Building, description: 'About your organization' },
    { id: 3, name: 'Project', icon: Briefcase, description: 'Project requirements' },
    { id: 4, name: 'Review', icon: CheckCircle, description: 'Review & submit' },
  ];

  const services = [
    'ECO 4 Leads',
    'Housing Disrepair Leads',
    'Life Insurance Leads',
    'Google PPC',
    'Social Media Advertising',
    'Native Advertising',
    'Custom Campaign',
    'Other',
  ];

  const budgetRanges = [
    'Under £5,000',
    '£5,000 - £10,000',
    '£10,000 - £25,000',
    '£25,000 - £50,000',
    '£50,000+',
    'Not sure yet',
  ];

  const timelines = [
    'Immediately',
    'Within 1 month',
    '1-3 months',
    '3-6 months',
    '6+ months',
    'Just exploring',
  ];

  const companySizes = [
    '1-10 employees',
    '11-50 employees',
    '51-200 employees',
    '201-500 employees',
    '500+ employees',
  ];

  const industries = [
    'Technology',
    'Healthcare',
    'Finance',
    'Retail',
    'Manufacturing',
    'Education',
    'Real Estate',
    'Marketing',
    'Other',
  ];

  // Session key for auto-save
  const sessionKey = React.useMemo(() => {
    let key = sessionStorage.getItem('multiStepFormKey');
    if (!key) {
      key = `multistep_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem('multiStepFormKey', key);
    }
    return key;
  }, []);

  // Auto-save hook
  const {
    isSaving,
    lastSaved,
    hasUnsavedChanges,
    error,
    isEnabled,
    clearSavedData,
    toggleConsent
  } = useAutoSave(formData, {
    key: sessionKey,
    debounceMs: 1500,
    endpoint: config.api.baseUrl,
    enabled: true,
    onRestore: (data) => {
      setFormData(data);
      toast.success('Previous form data restored');
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<FormData> = {};
    
    switch (step) {
      case 1:
        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email';
        break;
      case 2:
        if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required';
        if (!formData.industry) newErrors.industry = 'Please select an industry';
        break;
      case 3:
        if (!formData.service) newErrors.service = 'Please select a service';
        if (!formData.budget) newErrors.budget = 'Please select a budget range';
        if (!formData.timeline) newErrors.timeline = 'Please select a timeline';
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(3)) return;
    
    setIsSubmitting(true);
    
    try {
      const response = await axios.post(`${config.api.baseUrl}/contact`, {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        company: formData.companyName,
        service: formData.service,
        message: `
Job Title: ${formData.jobTitle}
Company Size: ${formData.companySize}
Industry: ${formData.industry}
Website: ${formData.website}
Country: ${formData.country}
Budget: ${formData.budget}
Timeline: ${formData.timeline}
Goals: ${formData.goals}
Challenges: ${formData.challenges}
Additional Message: ${formData.message}
How they heard about us: ${formData.howHeard}
Preferred Contact: ${formData.preferredContact}
        `.trim(),
      });
      
      if (response.data.success) {
        toast.success('Thank you! We\'ll get back to you soon.');
        await clearSavedData();
        
        sessionStorage.setItem('submittedName', `${formData.firstName} ${formData.lastName}`);
        sessionStorage.setItem('submittedEmail', formData.email);
        
        navigate('/thank-you');
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const calculateProgress = () => {
    return Math.round((currentStep / totalSteps) * 100);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-orange-500 mb-6">Personal Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-orange-500/80 mb-2 text-sm font-medium">
                  First Name *
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-white border-2 ${errors.firstName ? 'border-black' : 'border-black/30'} rounded-xl text-orange-500 placeholder-gray-500 focus:outline-none focus:border-black/60 transition-colors`}
                  placeholder="John"
                />
                {errors.firstName && (
                  <p className="text-orange-500 text-sm mt-1">{errors.firstName}</p>
                )}
              </div>
              
              <div>
                <label className="block text-orange-500/80 mb-2 text-sm font-medium">
                  Last Name *
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-white border-2 ${errors.lastName ? 'border-black' : 'border-black/30'} rounded-xl text-orange-500 placeholder-gray-500 focus:outline-none focus:border-black/60 transition-colors`}
                  placeholder="Doe"
                />
                {errors.lastName && (
                  <p className="text-orange-500 text-sm mt-1">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-orange-500/80 mb-2 text-sm font-medium">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-white border-2 ${errors.email ? 'border-black' : 'border-black/30'} rounded-xl text-orange-500 placeholder-gray-500 focus:outline-none focus:border-black/60 transition-colors`}
                placeholder="john@example.com"
              />
              {errors.email && (
                <p className="text-orange-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-orange-500/80 mb-2 text-sm font-medium">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border-2 border-black/30 rounded-xl text-orange-500 placeholder-gray-500 focus:outline-none focus:border-black/60 transition-colors"
                  placeholder="+44 20 1234 5678"
                />
              </div>
              
              <div>
                <label className="block text-orange-500/80 mb-2 text-sm font-medium">
                  Job Title
                </label>
                <input
                  type="text"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border-2 border-black/30 rounded-xl text-orange-500 placeholder-gray-500 focus:outline-none focus:border-black/60 transition-colors"
                  placeholder="Marketing Manager"
                />
              </div>
            </div>

            <div>
              <label className="block text-orange-500/80 mb-2 text-sm font-medium">
                Preferred Contact Method
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="preferredContact"
                    value="email"
                    checked={formData.preferredContact === 'email'}
                    onChange={handleChange}
                    className="w-4 h-4"
                  />
                  <span className="text-orange-500/70">Email</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="preferredContact"
                    value="phone"
                    checked={formData.preferredContact === 'phone'}
                    onChange={handleChange}
                    className="w-4 h-4"
                  />
                  <span className="text-orange-500/70">Phone</span>
                </label>
              </div>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-orange-500 mb-6">Company Information</h3>
            
            <div>
              <label className="block text-orange-500/80 mb-2 text-sm font-medium">
                Company Name *
              </label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-white border-2 ${errors.companyName ? 'border-black' : 'border-black/30'} rounded-xl text-orange-500 placeholder-gray-500 focus:outline-none focus:border-black/60 transition-colors`}
                placeholder="Your Company Ltd"
              />
              {errors.companyName && (
                <p className="text-orange-500 text-sm mt-1">{errors.companyName}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-orange-500/80 mb-2 text-sm font-medium">
                  Company Size
                </label>
                <select
                  name="companySize"
                  value={formData.companySize}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border-2 border-black/30 rounded-xl text-orange-500 focus:outline-none focus:border-black/60 transition-colors"
                >
                  <option value="">Select size</option>
                  {companySizes.map(size => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-orange-500/80 mb-2 text-sm font-medium">
                  Industry *
                </label>
                <select
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-white border-2 ${errors.industry ? 'border-black' : 'border-black/30'} rounded-xl text-orange-500 focus:outline-none focus:border-black/60 transition-colors`}
                >
                  <option value="">Select industry</option>
                  {industries.map(industry => (
                    <option key={industry} value={industry}>{industry}</option>
                  ))}
                </select>
                {errors.industry && (
                  <p className="text-orange-500 text-sm mt-1">{errors.industry}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-orange-500/80 mb-2 text-sm font-medium">
                  Website
                </label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border-2 border-black/30 rounded-xl text-orange-500 placeholder-gray-500 focus:outline-none focus:border-black/60 transition-colors"
                  placeholder="https://example.com"
                />
              </div>
              
              <div>
                <label className="block text-orange-500/80 mb-2 text-sm font-medium">
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border-2 border-black/30 rounded-xl text-orange-500 placeholder-gray-500 focus:outline-none focus:border-black/60 transition-colors"
                  placeholder="United Kingdom"
                />
              </div>
            </div>

            <div>
              <label className="block text-orange-500/80 mb-2 text-sm font-medium">
                How did you hear about us?
              </label>
              <input
                type="text"
                name="howHeard"
                value={formData.howHeard}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white border-2 border-black/30 rounded-xl text-orange-500 placeholder-gray-500 focus:outline-none focus:border-black/60 transition-colors"
                placeholder="Google search, referral, etc."
              />
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-orange-500 mb-6">Project Details</h3>
            
            <div>
              <label className="block text-orange-500/80 mb-2 text-sm font-medium">
                Service Interested In *
              </label>
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-white border-2 ${errors.service ? 'border-black' : 'border-black/30'} rounded-xl text-orange-500 focus:outline-none focus:border-black/60 transition-colors`}
              >
                <option value="">Select a service</option>
                {services.map(service => (
                  <option key={service} value={service}>{service}</option>
                ))}
              </select>
              {errors.service && (
                <p className="text-orange-500 text-sm mt-1">{errors.service}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-orange-500/80 mb-2 text-sm font-medium">
                  Budget Range *
                </label>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-white border-2 ${errors.budget ? 'border-black' : 'border-black/30'} rounded-xl text-orange-500 focus:outline-none focus:border-black/60 transition-colors`}
                >
                  <option value="">Select budget</option>
                  {budgetRanges.map(budget => (
                    <option key={budget} value={budget}>{budget}</option>
                  ))}
                </select>
                {errors.budget && (
                  <p className="text-orange-500 text-sm mt-1">{errors.budget}</p>
                )}
              </div>
              
              <div>
                <label className="block text-orange-500/80 mb-2 text-sm font-medium">
                  Timeline *
                </label>
                <select
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-white border-2 ${errors.timeline ? 'border-black' : 'border-black/30'} rounded-xl text-orange-500 focus:outline-none focus:border-black/60 transition-colors`}
                >
                  <option value="">Select timeline</option>
                  {timelines.map(timeline => (
                    <option key={timeline} value={timeline}>{timeline}</option>
                  ))}
                </select>
                {errors.timeline && (
                  <p className="text-orange-500 text-sm mt-1">{errors.timeline}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-orange-500/80 mb-2 text-sm font-medium">
                Project Goals
              </label>
              <textarea
                name="goals"
                value={formData.goals}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 bg-white border-2 border-black/30 rounded-xl text-orange-500 placeholder-gray-500 focus:outline-none focus:border-black/60 transition-colors resize-none"
                placeholder="What are you hoping to achieve?"
              />
            </div>

            <div>
              <label className="block text-orange-500/80 mb-2 text-sm font-medium">
                Current Challenges
              </label>
              <textarea
                name="challenges"
                value={formData.challenges}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 bg-white border-2 border-black/30 rounded-xl text-orange-500 placeholder-gray-500 focus:outline-none focus:border-black/60 transition-colors resize-none"
                placeholder="What challenges are you facing?"
              />
            </div>

            <div>
              <label className="block text-orange-500/80 mb-2 text-sm font-medium">
                Additional Information
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 bg-white border-2 border-black/30 rounded-xl text-orange-500 placeholder-gray-500 focus:outline-none focus:border-black/60 transition-colors resize-none"
                placeholder="Tell us more about your project..."
              />
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-orange-500 mb-6">Review Your Information</h3>
            
            <div className="space-y-6">
              {/* Personal Information */}
              <div className="glass rounded-xl p-6">
                <h4 className="font-semibold text-orange-500 mb-4 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Personal Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-orange-500/60">Name:</span>
                    <p className="text-orange-500 font-medium">{formData.firstName} {formData.lastName}</p>
                  </div>
                  <div>
                    <span className="text-orange-500/60">Email:</span>
                    <p className="text-orange-500 font-medium">{formData.email}</p>
                  </div>
                  <div>
                    <span className="text-orange-500/60">Phone:</span>
                    <p className="text-orange-500 font-medium">{formData.phone || 'Not provided'}</p>
                  </div>
                  <div>
                    <span className="text-orange-500/60">Job Title:</span>
                    <p className="text-orange-500 font-medium">{formData.jobTitle || 'Not provided'}</p>
                  </div>
                </div>
              </div>

              {/* Company Information */}
              <div className="glass rounded-xl p-6">
                <h4 className="font-semibold text-orange-500 mb-4 flex items-center gap-2">
                  <Building className="w-5 h-5" />
                  Company Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-orange-500/60">Company:</span>
                    <p className="text-orange-500 font-medium">{formData.companyName}</p>
                  </div>
                  <div>
                    <span className="text-orange-500/60">Industry:</span>
                    <p className="text-orange-500 font-medium">{formData.industry}</p>
                  </div>
                  <div>
                    <span className="text-orange-500/60">Size:</span>
                    <p className="text-orange-500 font-medium">{formData.companySize || 'Not provided'}</p>
                  </div>
                  <div>
                    <span className="text-orange-500/60">Website:</span>
                    <p className="text-orange-500 font-medium">{formData.website || 'Not provided'}</p>
                  </div>
                </div>
              </div>

              {/* Project Details */}
              <div className="glass rounded-xl p-6">
                <h4 className="font-semibold text-orange-500 mb-4 flex items-center gap-2">
                  <Briefcase className="w-5 h-5" />
                  Project Details
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-orange-500/60">Service:</span>
                    <p className="text-orange-500 font-medium">{formData.service}</p>
                  </div>
                  <div>
                    <span className="text-orange-500/60">Budget:</span>
                    <p className="text-orange-500 font-medium">{formData.budget}</p>
                  </div>
                  <div>
                    <span className="text-orange-500/60">Timeline:</span>
                    <p className="text-orange-500 font-medium">{formData.timeline}</p>
                  </div>
                  <div>
                    <span className="text-orange-500/60">Contact Preference:</span>
                    <p className="text-orange-500 font-medium capitalize">{formData.preferredContact}</p>
                  </div>
                </div>
                {formData.goals && (
                  <div className="mt-4">
                    <span className="text-orange-500/60 text-sm">Goals:</span>
                    <p className="text-orange-500 text-sm mt-1">{formData.goals}</p>
                  </div>
                )}
                {formData.challenges && (
                  <div className="mt-4">
                    <span className="text-orange-500/60 text-sm">Challenges:</span>
                    <p className="text-orange-500 text-sm mt-1">{formData.challenges}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="glass rounded-xl p-6 border-2 border-black/20">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-orange-500 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-orange-500 mb-2">Ready to Submit?</h4>
                  <p className="text-orange-500/70 text-sm">
                    Please review your information above. Once submitted, our team will contact you within 24 hours.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className={`flex items-center ${index !== steps.length - 1 ? 'flex-1' : ''}`}
                >
                  <div className="relative">
                    <motion.div
                      initial={false}
                      animate={{
                        scale: currentStep === step.id ? 1.1 : 1,
                        backgroundColor: currentStep >= step.id ? '#000' : '#fff',
                      }}
                      className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                        currentStep >= step.id ? 'border-black' : 'border-black/30'
                      }`}
                    >
                      {currentStep > step.id ? (
                        <Check className="w-6 h-6 text-orange-500" />
                      ) : (
                        <step.icon className={`w-6 h-6 ${currentStep >= step.id ? 'text-orange-500' : 'text-orange-500/50'}`} />
                      )}
                    </motion.div>
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                      <p className={`text-xs ${currentStep === step.id ? 'text-orange-500 font-semibold' : 'text-orange-500/60'}`}>
                        {step.name}
                      </p>
                    </div>
                  </div>
                  {index !== steps.length - 1 && (
                    <div className="flex-1 mx-4">
                      <div className="h-1 bg-black/10 rounded-full overflow-hidden">
                        <motion.div
                          initial={false}
                          animate={{
                            width: currentStep > step.id ? '100%' : '0%',
                          }}
                          transition={{ duration: 0.3 }}
                          className="h-full bg-black"
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form Content */}
          <div className="glass rounded-3xl p-8 mt-12">
            <AnimatePresence mode="wait">
              {renderStepContent()}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-black/10">
              <motion.button
                type="button"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                whileHover={{ scale: currentStep === 1 ? 1 : 1.02 }}
                whileTap={{ scale: currentStep === 1 ? 1 : 0.98 }}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                  currentStep === 1
                    ? 'text-orange-500/30 cursor-not-allowed'
                    : 'text-orange-500 hover:bg-black/5'
                }`}
              >
                <ArrowLeft className="w-5 h-5" />
                Previous
              </motion.button>

              <div className="text-orange-500/60 text-sm">
                Step {currentStep} of {totalSteps}
              </div>

              {currentStep < totalSteps ? (
                <motion.button
                  type="button"
                  onClick={handleNext}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 px-6 py-3 bg-black text-orange-500 rounded-xl font-medium hover:bg-black/90 transition-all"
                >
                  Next
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              ) : (
                <motion.button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  className="flex items-center gap-2 px-6 py-3 bg-black text-orange-500 rounded-xl font-medium hover:bg-black/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit
                      <CheckCircle className="w-5 h-5" />
                    </>
                  )}
                </motion.button>
              )}
            </div>
          </div>

          {/* Auto-save indicator */}
          {isEnabled && (
            <div className="text-center mt-4 text-sm text-orange-500/60">
              {isSaving && 'Saving...'}
              {!isSaving && lastSaved && `Last saved ${new Date(lastSaved).toLocaleTimeString()}`}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default MultiStepContact;