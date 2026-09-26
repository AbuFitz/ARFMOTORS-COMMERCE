/**
 * Postcode Checker for FixNow Mechanics Fitting Service
 *
 * Service area: London + surrounding regions, up to Peterborough maximum
 * This is a simplified implementation. For production, integrate with a proper
 * postcode distance API like Google Maps Distance Matrix or Postcodes.io
 */

// Simplified postcode area checking
// In production, replace with actual geolocation/distance calculation
const COVERED_AREAS = [
  // London areas
  'E', 'EC', 'N', 'NW', 'SE', 'SW', 'W', 'WC',
  // Surrounding areas up to Peterborough
  'AL', 'CM', 'EN', 'HA', 'IG', 'RM', 'SG', 'SS', 'UB', 'WD',
  'BR', 'CR', 'DA', 'KT', 'SM', 'TW', 'TN',
  'CB', 'IP', 'LU', 'MK', 'PE', 'SL', 'HP', 'RG'
];

export interface PostcodeCheckResult {
  isAvailable: boolean;
  message: string;
  postcode: string;
}

export function checkPostcodeCoverage(postcode: string): PostcodeCheckResult {
  // Remove spaces and convert to uppercase
  const cleanPostcode = postcode.replace(/\s/g, '').toUpperCase();

  // Basic UK postcode validation
  const postcodeRegex = /^[A-Z]{1,2}[0-9][A-Z0-9]?[0-9][A-Z]{2}$/;
  if (!postcodeRegex.test(cleanPostcode)) {
    return {
      isAvailable: false,
      message: "Please enter a valid UK postcode.",
      postcode: cleanPostcode,
    };
  }

  // Extract area code (first 1-2 letters)
  const areaMatch = cleanPostcode.match(/^[A-Z]{1,2}/);
  if (!areaMatch) {
    return {
      isAvailable: false,
      message: "Unable to determine postcode area.",
      postcode: cleanPostcode,
    };
  }

  const area = areaMatch[0];

  // Check if area is covered
  if (COVERED_AREAS.includes(area)) {
    return {
      isAvailable: true,
      message: "Good news: FixNow Mechanics cover your area for fitting.",
      postcode: cleanPostcode,
    };
  }

  return {
    isAvailable: false,
    message: "Fitting isn't available in your area yet, but you can still order this product for delivery.",
    postcode: cleanPostcode,
  };
}

export function formatPostcode(postcode: string): string {
  const clean = postcode.replace(/\s/g, '').toUpperCase();
  if (clean.length < 5) return clean;

  // Format as "XX## #XX" or "X## #XX"
  const outward = clean.slice(0, -3);
  const inward = clean.slice(-3);
  return `${outward} ${inward}`;
}
