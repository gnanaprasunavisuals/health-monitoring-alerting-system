import React, { useState, useEffect } from 'react';
import { Calculator, Heart, Scale, Ruler, TrendingUp } from 'lucide-react';

interface BMIResult {
  bmi: number;
  category: string;
  color: string;
  description: string;
  tips: string[];
}

function App() {
  const [height, setHeight] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [heightUnit, setHeightUnit] = useState<'cm' | 'ft'>('cm');
  const [weightUnit, setWeightUnit] = useState<'kg' | 'lbs'>('kg');
  const [feet, setFeet] = useState<string>('');
  const [inches, setInches] = useState<string>('');
  const [result, setResult] = useState<BMIResult | null>(null);

  const getBMICategory = (bmi: number): BMIResult => {
    if (bmi < 18.5) {
      return {
        bmi,
        category: 'Underweight',
        color: 'from-blue-400 to-blue-600',
        description: 'Below normal weight range',
        tips: [
          'Consult with a healthcare provider about healthy weight gain',
          'Focus on nutrient-dense foods',
          'Consider strength training exercises'
        ]
      };
    } else if (bmi < 25) {
      return {
        bmi,
        category: 'Normal Weight',
        color: 'from-green-400 to-green-600',
        description: 'Within healthy weight range',
        tips: [
          'Maintain current lifestyle habits',
          'Continue regular physical activity',
          'Keep a balanced, nutritious diet'
        ]
      };
    } else if (bmi < 30) {
      return {
        bmi,
        category: 'Overweight',
        color: 'from-yellow-400 to-orange-500',
        description: 'Above normal weight range',
        tips: [
          'Consider gradual weight loss through diet and exercise',
          'Increase physical activity',
          'Focus on portion control'
        ]
      };
    } else {
      return {
        bmi,
        category: 'Obese',
        color: 'from-red-400 to-red-600',
        description: 'Significantly above normal weight range',
        tips: [
          'Consult with a healthcare provider for a personalized plan',
          'Consider professional nutritional guidance',
          'Start with low-impact exercises'
        ]
      };
    }
  };

  const calculateBMI = () => {
    let heightInMeters: number;
    let weightInKg: number;

    // Convert height to meters
    if (heightUnit === 'cm') {
      const heightValue = parseFloat(height);
      if (!heightValue || heightValue <= 0) return;
      heightInMeters = heightValue / 100;
    } else {
      const feetValue = parseFloat(feet);
      const inchesValue = parseFloat(inches) || 0;
      if (!feetValue || feetValue < 0) return;
      const totalInches = (feetValue * 12) + inchesValue;
      heightInMeters = totalInches * 0.0254;
    }

    // Convert weight to kg
    if (weightUnit === 'kg') {
      weightInKg = parseFloat(weight);
    } else {
      weightInKg = parseFloat(weight) * 0.453592;
    }

    if (!weightInKg || weightInKg <= 0) return;

    const bmi = weightInKg / (heightInMeters * heightInMeters);
    setResult(getBMICategory(bmi));
  };

  useEffect(() => {
    calculateBMI();
  }, [height, weight, feet, inches, heightUnit, weightUnit]);

  const resetForm = () => {
    setHeight('');
    setWeight('');
    setFeet('');
    setInches('');
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4">
            <Calculator className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            BMI Calculator
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Calculate your Body Mass Index and get personalized health insights. 
            Track your health journey with our beautiful, easy-to-use calculator.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                <Scale className="w-6 h-6 mr-3 text-blue-600" />
                Enter Your Measurements
              </h2>

              {/* Height Input */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  <Ruler className="w-4 h-4 inline mr-2" />
                  Height
                </label>
                <div className="flex gap-3 mb-3">
                  <button
                    onClick={() => setHeightUnit('cm')}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      heightUnit === 'cm'
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Centimeters
                  </button>
                  <button
                    onClick={() => setHeightUnit('ft')}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      heightUnit === 'ft'
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Feet & Inches
                  </button>
                </div>

                {heightUnit === 'cm' ? (
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="Enter height in cm"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                ) : (
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <input
                        type="number"
                        value={feet}
                        onChange={(e) => setFeet(e.target.value)}
                        placeholder="Feet"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>
                    <div className="flex-1">
                      <input
                        type="number"
                        value={inches}
                        onChange={(e) => setInches(e.target.value)}
                        placeholder="Inches"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Weight Input */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  <Scale className="w-4 h-4 inline mr-2" />
                  Weight
                </label>
                <div className="flex gap-3 mb-3">
                  <button
                    onClick={() => setWeightUnit('kg')}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      weightUnit === 'kg'
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Kilograms
                  </button>
                  <button
                    onClick={() => setWeightUnit('lbs')}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      weightUnit === 'lbs'
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Pounds
                  </button>
                </div>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder={`Enter weight in ${weightUnit}`}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Reset Button */}
              <button
                onClick={resetForm}
                className="w-full py-3 px-6 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                Reset Calculator
              </button>
            </div>

            {/* Results Section */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                <TrendingUp className="w-6 h-6 mr-3 text-green-600" />
                Your Results
              </h2>

              {result ? (
                <div className="space-y-6">
                  {/* BMI Score */}
                  <div className="text-center">
                    <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r ${result.color} shadow-lg mb-4`}>
                      <span className="text-2xl font-bold text-white">
                        {result.bmi.toFixed(1)}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">{result.category}</h3>
                    <p className="text-gray-600 mt-1">{result.description}</p>
                  </div>

                  {/* Health Tips */}
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                      <Heart className="w-5 h-5 mr-2 text-red-500" />
                      Health Recommendations
                    </h4>
                    <ul className="space-y-2">
                      {result.tips.map((tip, index) => (
                        <li key={index} className="flex items-start text-gray-700">
                          <span className="text-blue-500 mr-2">•</span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calculator className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500 text-lg">
                    Enter your height and weight to calculate your BMI
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;