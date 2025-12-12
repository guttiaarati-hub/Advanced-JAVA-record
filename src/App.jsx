/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { FileText, ChevronRight } from 'lucide-react';
import * as mammoth from 'mammoth';

// Import all week documents
import week1 from './assets/week-1.docx';
import week2 from './assets/week-2.docx';
import week3 from './assets/week-3.docx';
import week4 from './assets/week-4.docx';
import week5 from './assets/week-5.docx';
import week6 from './assets/week-6.docx';
import week7 from './assets/week-7.docx';
import week8 from './assets/week-8.docx';
import week9 from './assets/week-9.docx';
import week10 from './assets/week-10.docx';
import week11 from './assets/week-11.docx';
import week12 from './assets/week-12.docx';

const JavaLabViewer = () => {
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [documentContent, setDocumentContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const weekFiles = {
    1: week1,
    2: week2,
    3: week3,
    4: week4,
    5: week5,
    6: week6,
    7: week7,
    8: week8,
    9: week9,
    10: week10,
    11: week11,
    12: week12
  };

  const weeks = Array.from({ length: 12 }, (_, i) => i + 1);

  const loadDocument = async (weekNumber) => {
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(weekFiles[weekNumber]);
      const arrayBuffer = await response.arrayBuffer();
      
      const result = await mammoth.convertToHtml({ arrayBuffer });
      setDocumentContent(result.value);
      setError('');
    } catch ( err) {
      setError(`Unable to load Week ${weekNumber} document.`);
      setDocumentContent('');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDocument(selectedWeek);
  }, [selectedWeek]);

  const handleWeekClick = (week) => {
    setSelectedWeek(week);
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900">
      {/* Top Header - Profile Section */}
      <div className="bg-gradient-to-r from-slate-800 via-gray-700 to-slate-800 shadow-2xl border-b border-gray-600/30">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center gap-6">
            {/* Professional Record Icon */}
            <div className="relative">
              <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-slate-700 to-gray-800 shadow-2xl ring-2 ring-gray-500/50 flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-lg border-4 border-slate-800 shadow-lg flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            
            {/* Student Info */}
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-white mb-1 tracking-wide">
                Gutti Aarati
              </h1>
              <div className="flex items-center gap-4">
                <p className="text-gray-300 text-sm font-medium">
                  <span className="text-gray-400">Roll:</span> <span className="text-white font-semibold">238W1A1291</span>
                </p>
              </div>
            </div>

            {/* Decorative Element */}
            <div className="hidden md:flex items-center gap-2 text-gray-300 bg-slate-700/50 px-4 py-2 rounded-lg border border-gray-600/30">
              <FileText className="w-5 h-5" />
              <span className="text-sm font-medium">Java Lab</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Week Selector */}
        <div className="w-64 bg-gradient-to-b from-slate-800 to-gray-900 border-r border-gray-700/50 shadow-2xl overflow-hidden flex flex-col">
          <div className="p-4 border-b border-gray-700/50 bg-slate-800/80">
            <h2 className="text-lg font-bold text-white">Weeks</h2>
          </div>
          
          <div className="flex-1 overflow-y-auto p-3 space-y-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
            {weeks.map((week) => (
              <button
                key={week}
                onClick={() => handleWeekClick(week)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-300 group ${
                  selectedWeek === week
                    ? 'bg-gradient-to-r from-slate-600 to-gray-600 text-white shadow-lg scale-105'
                    : 'bg-slate-800/50 text-gray-300 hover:bg-slate-700/70 hover:text-white border border-gray-700/30 hover:border-gray-600/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <FileText 
                    className={`w-5 h-5 ${
                      selectedWeek === week ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'
                    }`} 
                  />
                  <span className="font-semibold">Week {week}</span>
                </div>
                <ChevronRight 
                  className={`w-4 h-4 transition-transform ${
                    selectedWeek === week ? 'text-white translate-x-1' : 'text-gray-500'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right Main Panel - Document Viewer */}
        <div className="flex-1 bg-white overflow-hidden flex flex-col">
          {/* Document Header */}
          <div className="px-8 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-slate-50">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-800">Week {selectedWeek}</h2>
                <p className="text-sm text-gray-600 mt-1">Laboratory Record</p>
              </div>
            </div>
          </div>

          {/* Document Content */}
          <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="w-16 h-16 border-4 border-slate-700 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-gray-700 font-medium">Loading...</p>
                </div>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center max-w-md">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-8 h-8 text-red-500" />
                  </div>
                  <p className="text-red-600 font-medium mb-2">Document Not Found</p>
                  <p className="text-gray-600 text-sm">{error}</p>
                </div>
              </div>
            ) : (
              <div className="max-w-5xl mx-auto p-8">
                <div 
                  className="prose prose-slate max-w-none bg-white rounded-lg shadow-lg border border-gray-200 p-10"
                  dangerouslySetInnerHTML={{ __html: documentContent }}
                  style={{
                    fontSize: '15px',
                    lineHeight: '1.8',
                    color: '#1e293b'
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gradient-to-r from-slate-800 via-gray-800 to-slate-800 border-t border-gray-700/50 px-8 py-3 shadow-2xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs text-gray-400">
          <p>Java Programming Laboratory</p>
          <p className="text-gray-300">Week <span className="font-semibold text-white">{selectedWeek}</span> of 12</p>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-thin::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-thumb-gray-600::-webkit-scrollbar-thumb {
          background: #4b5563;
          border-radius: 4px;
        }
        .scrollbar-thumb-gray-600::-webkit-scrollbar-thumb:hover {
          background: #6b7280;
        }
        .scrollbar-track-gray-800::-webkit-scrollbar-track {
          background: #1f2937;
        }
        .scrollbar-thumb-gray-400::-webkit-scrollbar-thumb {
          background: #9ca3af;
          border-radius: 4px;
        }
        .scrollbar-thumb-gray-400::-webkit-scrollbar-thumb:hover {
          background: #6b7280;
        }
        .scrollbar-track-gray-100::-webkit-scrollbar-track {
          background: #f3f4f6;
        }
      `}</style>
    </div>
  );
};

export default JavaLabViewer;