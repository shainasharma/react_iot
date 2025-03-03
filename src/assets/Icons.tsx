const EditIcon = ({ size = 32, color = "currentColor" }) => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24" 
      strokeWidth="2" 
      stroke={color} 
      width={size} 
      height={size} 
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        d="M16.862 3.487a2.25 2.25 0 1 1 3.182 3.182L6.75 19.964l-4.5 1.5 1.5-4.5L16.862 3.487z"
      />
    </svg>
  );
  
  const DeleteIcon = ({ size = 32, color = "currentColor" }) => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24" 
      strokeWidth="2" 
      stroke={color} 
      width={size} 
      height={size} 
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
  
  export { EditIcon, DeleteIcon };
  