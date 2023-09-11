export function downloadJsonStringAsFile(
  jsonString: string,
  filename: string
): void {
  // Create a Blob containing the JSON data
  const blob = new Blob([jsonString], { type: 'application/json' });

  // Create a temporary URL for the Blob
  const url = URL.createObjectURL(blob);

  // Create a hidden anchor element
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;

  // Programmatically trigger a click event on the anchor element
  a.dispatchEvent(new MouseEvent('click'));

  // Clean up by revoking the Blob URL
  URL.revokeObjectURL(url);
}
