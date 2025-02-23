import React, { useState } from 'react';

// Define the types first
type PaintQuality = 'economy' | 'premium' | 'luxury';

// Define the Settings interface
interface Settings {
  paintPrices: {
    [K in PaintQuality]: {
      cost: number;
      price: number;
    };
  };
  labor: {
    pricePerHour: number;
    squareFeetPerHour: number;
  };
  additionalServices: {
    trim: {
      price: number;
    };
    wallRepair: {
      price: number;
    };
  };
  coverage: {
    squareFeetPerGallon: number;
  };
}

// Define the FormData interface
interface FormData {
  clientName: string;
  clientEmail: string;
  roomDetails: {
    length: string;
    width: string;
    height: string;
  };
  paintQuality: PaintQuality;
  additionalServices: {
    trim: boolean;
    wallRepair: boolean;
  };
}

type FormErrors = {
  clientName?: string;
  clientEmail?: string;
  length?: string;
  width?: string;
  height?: string;
};

export default function QuoteGenerator() {

  const [errors, setErrors] = useState<FormErrors>({});

  const [settings, setSettings] = useState<Settings>({
    paintPrices: {
      economy: {
        cost: 25,
        price: 45
      },
      premium: {
        cost: 35,
        price: 65
      },
      luxury: {
        cost: 50,
        price: 95
      }
    },
    labor: {
      pricePerHour: 65,
      squareFeetPerHour: 100
    },
    additionalServices: {
      trim: {
        price: 450
      },
      wallRepair: {
        price: 350
      }
    },
    coverage: {
      squareFeetPerGallon: 375
    }
  });

  // Form States
  const [showSettings, setShowSettings] = useState(false);
  const [showQuote, setShowQuote] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    clientName: '',
    clientEmail: '',
    roomDetails: {
      length: '',
      width: '',
      height: '',
    },
    paintQuality: 'premium',
    additionalServices: {
      trim: false,
      wallRepair: false
    }
  });

  const [isSubmitting, setIsSubmitting] = useState(false);



  // const [errors, setErrors] = useState({});

  // Calculate total based on current settings
  const calculateTotal = () => {
    const { length, width, height } = formData.roomDetails;
    const wallArea = (parseFloat(length) * parseFloat(height) * 2) + 
                    (parseFloat(width) * parseFloat(height) * 2);
    
    // Calculate paint needed
    const gallonsNeeded = Math.ceil(wallArea / settings.coverage.squareFeetPerGallon);
    const paintCost = gallonsNeeded * settings.paintPrices[formData.paintQuality].price;
    
    // Calculate labor
    const laborHours = Math.ceil(wallArea / settings.labor.squareFeetPerHour);
    const laborCost = laborHours * settings.labor.pricePerHour;
    
    // Add additional services
    let additionalCosts = 0;
    if (formData.additionalServices.trim) {
      additionalCosts += settings.additionalServices.trim.price;
    }
    if (formData.additionalServices.wallRepair) {
      additionalCosts += settings.additionalServices.wallRepair.price;
    }
    
    return Math.ceil(paintCost + laborCost + additionalCosts);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: FormErrors = {};
  
    // Validate form
    if (!formData.clientName.trim()) newErrors.clientName = 'Name is required';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.clientEmail.trim()) {
      newErrors.clientEmail = 'Email is required';
    } else if (!emailRegex.test(formData.clientEmail)) {
      newErrors.clientEmail = 'Invalid email format';
    }
  
    // Validate room dimensions (positive numbers)
    const length = parseFloat(formData.roomDetails.length);
    const width = parseFloat(formData.roomDetails.width);
    const height = parseFloat(formData.roomDetails.height);
  
    if (!formData.roomDetails.length.trim()) {
      newErrors.length = 'Length is required';
    } else if (isNaN(length) || length <= 0) {
      newErrors.length = 'Length must be a positive number';
    }
  
    if (!formData.roomDetails.width.trim()) {
      newErrors.width = 'Width is required';
    } else if (isNaN(width) || width <= 0) {
      newErrors.width = 'Width must be a positive number';
    }
  
    if (!formData.roomDetails.height.trim()) {
      newErrors.height = 'Height is required';
    } else if (isNaN(height) || height <= 0) {
      newErrors.height = 'Height must be a positive number';
    }
  
    setErrors(newErrors);
  
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      await new Promise(resolve => setTimeout(resolve, 2000)); // Increased to 2 seconds
      setShowQuote(true);
      setIsSubmitting(false);
    }
     else {
      alert('Please correct the errors in the form');
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto relative">
        {/* Settings Button */}
        <button
          onClick={() => setShowSettings(true)}
          className="absolute -top-10 right-0 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 print-hide"
        >
          ⚙️ Customize Prices (Free Version)
        </button>

        {/* Main Card */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          {!showQuote ? (
            // Quote Form
            <form onSubmit={handleSubmit} className="space-y-6">
              <h1 className="text-2xl text-gray-900 font-bold">Paint Job Quote Generator</h1>

              {/* Client Information */}
              <div className="space-y-4">
                <h2 className="font-semibold text-gray-900">Client Information</h2>
                <input
                  type="text"
                  placeholder="Client Name *"
                  className={`text-gray-900 w-full p-2 border rounded ${errors.clientName ? 'border-red-500' : ''}`}
                  value={formData.clientName}
                  onChange={(e) => setFormData({...formData, clientName: e.target.value})}
                />
                {errors.clientName && <p className="text-red-500 text-sm">{errors.clientName}</p>}

                <input
                  type="email"
                  placeholder="Client Email *"
                  className={`text-gray-900 w-full p-2 border rounded ${errors.clientEmail ? 'border-red-500' : ''}`}
                  value={formData.clientEmail}
                  onChange={(e) => setFormData({...formData, clientEmail: e.target.value})}
                />
                {errors.clientEmail && <p className="text-red-500 text-sm">{errors.clientEmail}</p>}
              </div>

              {/* Room Dimensions */}
              <div className="space-y-4">
                <h2 className="font-semibold text-gray-900">Room Dimensions</h2>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <input
                      type="number"
                      placeholder="Length (ft) *"
                      className={`text-gray-900 w-full p-2 border rounded ${errors.length ? 'border-red-500' : ''}`}
                      value={formData.roomDetails.length}
                      onChange={(e) => setFormData({
                        ...formData,
                        roomDetails: { ...formData.roomDetails, length: e.target.value }
                      })}
                    />
                    {errors.length && <p className="text-red-500 text-sm">{errors.length}</p>}
                  </div>
                  <div>
                    <input
                      type="number"
                      placeholder="Width (ft) *"
                      className={`text-gray-900 w-full p-2 border rounded ${errors.width ? 'border-red-500' : ''}`}
                      value={formData.roomDetails.width}
                      onChange={(e) => setFormData({
                        ...formData,
                        roomDetails: { ...formData.roomDetails, width: e.target.value }
                      })}
                    />
                    {errors.width && <p className="text-red-500 text-sm">{errors.width}</p>}
                  </div>
                  <div>
                    <input
                      type="number"
                      placeholder="Height (ft) *"
                      className={`text-gray-900 w-full p-2 border rounded ${errors.height ? 'border-red-500' : ''}`}
                      value={formData.roomDetails.height}
                      onChange={(e) => setFormData({
                        ...formData,
                        roomDetails: { ...formData.roomDetails, height: e.target.value }
                      })}
                    />
                    {errors.height && <p className="text-red-500 text-sm">{errors.height}</p>}
                  </div>
                </div>
              </div>

              {/* Paint Options */}
              <div className="space-y-4">
                <h2 className="font-semibold text-gray-900">Paint Options</h2>
                <select 
                  className="w-full p-2 border rounded text-gray-500"
                  value={formData.paintQuality}
                  onChange={(e) => setFormData({
                    ...formData, 
                    paintQuality: e.target.value as PaintQuality
                  })}
                >
                  <option value="economy">Economy Paint (${settings.paintPrices.economy.price}/gallon)</option>
                  <option value="premium">Premium Paint (${settings.paintPrices.premium.price}/gallon)</option>
                  <option value="luxury">Luxury Paint (${settings.paintPrices.luxury.price}/gallon)</option>
                </select>

                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.additionalServices.trim}
                      onChange={(e) => setFormData({
                        ...formData,
                        additionalServices: {
                          ...formData.additionalServices,
                          trim: e.target.checked
                        }
                      })}
                    />
                    <span className='text-gray-900'>Include Trim Work (+${settings.additionalServices.trim.price})</span>
                  </label>

                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.additionalServices.wallRepair}
                      onChange={(e) => setFormData({
                        ...formData,
                        additionalServices: {
                          ...formData.additionalServices,
                          wallRepair: e.target.checked
                        }
                      })}
                    />
                    <span className='text-gray-900'>Wall Repair (+${settings.additionalServices.wallRepair.price})</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full p-3 ${isSubmitting 
                  ? 'bg-blue-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700'} text-white rounded`}
              >
                {isSubmitting ? 
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span> 
                  : 'Generate Quote'
                }
              </button>
            </form>
          ) : (
            // Quote Display
            <div className="space-y-6">
              <h2 className="text-gray-900 text-2xl font-bold">Quote Summary</h2>
              
              <div className="border-b pb-4">
                <h3 className="text-gray-900 font-semibold">Client Information</h3>
                <p className="text-gray-900">Name: {formData.clientName}</p>
                <p className="text-gray-900">Email: {formData.clientEmail}</p>
              </div>

              <div className="border-b pb-4">
                <h3 className="text-gray-900 font-semibold">Room Details</h3>
                <p className="text-gray-900">{formData.roomDetails.length}' × {formData.roomDetails.width}' × {formData.roomDetails.height}'</p>
                <p className="text-gray-900">Paint Quality: {formData.paintQuality.charAt(0).toUpperCase() + formData.paintQuality.slice(1)}</p>
                {formData.additionalServices.trim && <p className="text-gray-900">• Including Trim Work</p>}
                {formData.additionalServices.wallRepair && <p className="text-gray-900">• Including Wall Repair</p>}
              </div>

              <div>
                <h3 className="text-gray-900 font-semibold">Total Cost</h3>
                <p className="text-3xl font-bold text-blue-600">${calculateTotal()}</p>
                <p className="text-sm text-gray-500">Quote valid for 30 days</p>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => window.print()}
                  className="flex-1 p-3 bg-blue-600 text-white rounded hover:bg-blue-700 no-print"
                >
                  Print Quote
                </button>
                <button
                  onClick={() => setShowQuote(false)}
                  className="flex-1 p-3 bg-gray-600 text-white rounded hover:bg-gray-700 no-print"
                >
                  New Quote
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Settings Modal */}
        {showSettings && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-2xl w-full m-4">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">Price Settings</h2>
              <p className="text-red-500 mb-4">Note: Settings will reset when you refresh the page</p>
              
              {/* Paint Prices */}
              <div className="mb-6">
                <h3 className="font-semibold mb-2 text-gray-900">Paint Prices (per gallon)</h3>
                <div className="grid grid-cols-3 gap-4">
                {Object.entries(settings.paintPrices).map(([type, { price }]) => (
                  <div key={type}>
                    <label className="block text-sm mb-1 capitalize text-gray-900">{type}</label>
                    <div className="flex">
                      <span className="bg-blue-400 px-3 py-2 border border-r-0 rounded-l text-white">$</span>
                      <input
                        type="number"
                        value={price}
                        onChange={(e) => setSettings({
                          ...settings,
                          paintPrices: {
                            ...settings.paintPrices,
                            [type as PaintQuality]: {
                              ...settings.paintPrices[type as PaintQuality],
                              price: parseFloat(e.target.value)
                            }
                          }
                      })}
                      className="w-full p-2 border rounded-r text-gray-500"
                    />
                  </div>
                </div>
              ))}
                </div>
              </div>

              {/* Additional Services */}
              <div className="mb-6">
                <h3 className="font-semibold mb-2 text-gray-900">Additional Services</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-1 text-gray-900">Trim Work</label>
                    <div className="flex">
                      <span className="bg-blue-400 text-white px-3 py-2 border border-r-0 rounded-l">$</span>
                      <input
                        type="number"
                        value={settings.additionalServices.trim.price}
                        onChange={(e) => setSettings({
                          ...settings,
                          additionalServices: {
                            ...settings.additionalServices,
                            trim: {
                              price: parseFloat(e.target.value)
                            }
                          }
                        })}
                        className="w-full p-2 border rounded-r text-gray-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm mb-1 text-gray-900">Wall Repair</label>
                    <div className="flex">
                      <span className="bg-blue-400 text-white px-3 py-2 border border-r-0 rounded-l">$</span>
                      <input
                        type="number"
                        value={settings.additionalServices.wallRepair.price}
                        onChange={(e) => setSettings({
                          ...settings,
                          additionalServices: {
                            ...settings.additionalServices,
                            wallRepair: {
                              price: parseFloat(e.target.value)
                            }
                          }
                        })}
                        className="w-full p-2 border rounded-r text-gray-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4">
              <button
                  onClick={() => setShowSettings(false)}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
<div className="mt-8 text-center text-sm text-gray-500 pb-4">
  <a 
    href="/privacy-policy" 
    className="hover:text-gray-700 underline"
    target="_blank"
    rel="noopener noreferrer"
  >
    Privacy Policy
  </a>
  <span className="mx-2">•</span>
  <span>© {new Date().getFullYear()} Paint Quote Generator. All rights reserved.</span>
</div>
      </div>
    </div>
  );
}
