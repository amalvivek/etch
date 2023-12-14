interface RGB {
    r: number;
    g: number;
    b: number; 
  }
  
export function invertHex(hex: string): string | null {
  
    if (hex.length !== 7 || hex[0] !== '#') {
      return null;
    }
  
    // Convert hex to RGB
    const rgb: RGB = {
      r: parseInt(hex.slice(1, 3), 16),
      g: parseInt(hex.slice(3, 5), 16), 
      b: parseInt(hex.slice(5, 7), 16)  
    };
  
    // Invert RGB
    rgb.r = (255 - rgb.r);
    rgb.g = (255 - rgb.g);
    rgb.b = (255 - rgb.b);
  
    // Convert RGB back to hex
    const r = rgb.r.toString(16).padStart(2, '0');
    const g = rgb.g.toString(16).padStart(2, '0');
    const b = rgb.b.toString(16).padStart(2, '0');  
    return `#${r}${g}${b}`;
}