import { useState } from 'react';
import { FundingEntry } from '../types/funding';
import { initialFunding } from '../data/initialFunding';
import { bankDetails } from '../data/bankDetails';
import Image from 'next/image';

export default function FundingList() {
  const [entries] = useState<FundingEntry[]>(initialFunding);
  const [showBankDetails, setShowBankDetails] = useState(false);
  const total = entries.reduce((sum, entry) => sum + entry.amount, 0);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-6 sm:py-12 px-3 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2 tracking-tight">
            Funding Tracker
          </h1>
          <p className="text-base sm:text-lg text-gray-600">
            Total Contributions: <span className="font-semibold text-indigo-600">₮{total.toLocaleString()}</span>
          </p>
          <button
            onClick={() => setShowBankDetails(!showBankDetails)}
            className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors"
          >
            Contribute Now
          </button>
        </div>

        {/* Bank Details Modal */}
        {showBankDetails && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold text-gray-900">Bank Transfer Details</h2>
                <button
                  onClick={() => setShowBankDetails(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Bank Name</p>
                  <p className="font-semibold text-gray-900">{bankDetails.bankName}</p>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Account Name</p>
                  <p className="font-semibold text-gray-900">{bankDetails.accountName}</p>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Account Number</p>
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-gray-900">{bankDetails.accountNumber}</p>
                    <button
                      onClick={() => navigator.clipboard.writeText(bankDetails.accountNumber)}
                      className="text-blue-500 hover:text-blue-700 text-sm"
                    >
                      Copy
                    </button>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600 mb-4">Scan QR Code with Khan Bank App</p>
                  <div className="inline-block bg-white p-2 rounded-xl shadow-lg">
                    <Image
                      src={bankDetails.qrCode}
                      alt="Khan Bank QR Code"
                      width={200}
                      height={200}
                      className="rounded-lg"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Cards Grid */}
        <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
          {entries.map((entry) => (
            <div
              key={entry.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100"
            >
              <div className="p-4 sm:p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    {entry.profilePic ? (
                      <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-full overflow-hidden">
                        <Image
                          src={entry.profilePic}
                          alt={`${entry.name}'s profile`}
                          width={56}
                          height={56}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-blue-100 flex items-center justify-center ring-2 ring-blue-50">
                        <span className="text-blue-600 font-bold text-xl sm:text-2xl">
                          {entry.name.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-gray-800 break-words">
                        {entry.name}
                      </h3>
                      {entry.timestamp && (
                        <p className="text-xs text-gray-500">
                          {formatDate(new Date(entry.timestamp))}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="text-right ml-2">
                    <p className="text-base sm:text-lg font-bold text-blue-600 whitespace-nowrap">
                      ₮{entry.amount.toLocaleString()}
                    </p>
                    {entry.status && (
                      <span className={`text-xs ${entry.status === 'completed' ? 'text-green-500' : 'text-orange-500'}`}>
                        {entry.status}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Total Section */}
        <div className="mt-8 sm:mt-12 bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-gray-100">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <div className="mb-4 sm:mb-0">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Total Funding</h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                From {entries.length} contributors
              </p>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-2xl sm:text-3xl font-bold text-indigo-600">
                ₮{total.toLocaleString()}
              </p>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4 sm:mt-6">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-indigo-600 rounded-full animate-pulse"
                style={{ width: '100%' }}
              />
            </div>
          </div>

          {/* Mobile Stats */}
          <div className="grid grid-cols-2 gap-4 mt-4 sm:hidden">
            <div className="bg-indigo-50 rounded-lg p-3 text-center">
              <p className="text-sm text-indigo-600 font-medium">Average</p>
              <p className="text-lg font-bold text-indigo-700">
                ₮{Math.round(total / entries.length).toLocaleString()}
              </p>
            </div>
            <div className="bg-indigo-50 rounded-lg p-3 text-center">
              <p className="text-sm text-indigo-600 font-medium">Contributors</p>
              <p className="text-lg font-bold text-indigo-700">{entries.length}</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p className="hidden sm:block">
            Last updated: {formatDate(new Date())}
          </p>
          <p className="sm:hidden">
            Updated: {formatDate(new Date())}
          </p>
        </div>
      </div>
    </div>
  );
} 