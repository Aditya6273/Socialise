// Normalize string for comparison
function normalizeString(str) {
    return String(str).trim().toLowerCase();
  }
  
  // Check if string is numeric
  function isNumeric(str){
    return /^\d+$/.test(str);
  }
  
  export function matchesSearchTerm(user, searchTerm) {
    const normalizedSearch = normalizeString(searchTerm);
    
    if (!normalizedSearch) return true;
    
    // For numeric searches, only match exact ID numbers
    if (isNumeric(normalizedSearch)) {
      return user._id.includes(normalizedSearch);
    }
    
    // For text searches, match against all fields
    const searchableFields = [
      user.username,
      user.firstname,
      user.lastname
    ].filter(Boolean);
  
    return searchableFields.some(field => 
      normalizeString(field).includes(normalizedSearch)
    );
  }