type SpinnerProps = {
    className?: string;  
  };
  
  const Spinner: React.FC<SpinnerProps> = ({ className }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      className={` animate-spin text-text ${className}`}  
      stroke="currentColor"
    >
      <path d="M4.97498 12H7.89998" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M11.8 5V8" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M18.625 12H15.7" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M11.8 19V16" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M6.97374 16.95L9.04203 14.8287" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M6.97374 7.05001L9.04203 9.17133" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M16.6262 7.05001L14.5579 9.17133" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M16.6262 16.95L14.5579 14.8287" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
  
  export default Spinner;