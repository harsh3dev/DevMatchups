"use client"
import {CheckCheck, Copy } from 'lucide-react';
import React, { useState } from 'react';


const CopyButton = ({text}: {text:string}) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  };

  return (
    <button
      onClick={copyToClipboard}
      className="flex items-center  text-text text-xs focus:outline-none"
    >
      {copied ? (
        <CheckCheck className='w-4 h-4' />
      ) : (
        <Copy className='w-4 h-4' />
      )}
    </button>
  );
};

export default CopyButton;
