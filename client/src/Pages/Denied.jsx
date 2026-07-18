import React from 'react';

function Denied() {
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl border border-error/20">
        <div className="card-body items-center text-center gap-4">
          
          {/* Warning Icon */}
          <div className="p-4 bg-error/10 text-error rounded-full">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-12 w-12" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth={2}
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
              />
            </svg>
          </div>

          {/* Content */}
          <h2 className="card-title text-2xl font-bold text-error">Access Denied</h2>
          <p className="text-base-content/70">
            You do not have the required permissions to view this page. If you believe this is a mistake, please contact your administrator.
          </p>

          {/* Action Buttons */}
          <div className="card-actions justify-end w-full mt-4 gap-2">
            <button 
              className="btn btn-outline flex-1"
              onClick={() => window.history.back()}
            >
              Go Back
            </button>
            <a 
              href="/" 
              className="btn btn-primary flex-1"
            >
              Home
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Denied;