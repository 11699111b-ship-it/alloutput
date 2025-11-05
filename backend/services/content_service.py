import requests
from bs4 import BeautifulSoup
from typing import Dict

class ContentService:
    """Service for content extraction and processing"""
    
    @staticmethod
    def extract_url_content(url: str) -> str:
        """
        Extract text content from URL
        
        Args:
            url: Web page URL
        
        Returns:
            Extracted text content
        """
        try:
            # Set user agent to avoid blocks
            headers = {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
            
            response = requests.get(url, headers=headers, timeout=10)
            response.raise_for_status()
            
            # Parse HTML
            soup = BeautifulSoup(response.content, 'html.parser')
            
            # Remove script and style elements
            for script in soup(["script", "style"]):
                script.decompose()
            
            # Get text
            text = soup.get_text()
            
            # Clean up whitespace
            lines = (line.strip() for line in text.splitlines())
            chunks = (phrase.strip() for line in lines for phrase in line.split("  "))
            text = '\n'.join(chunk for chunk in chunks if chunk)
            
            return text
        
        except Exception as e:
            raise ValueError(f"Failed to extract content from URL: {str(e)}")
    
    @staticmethod
    def generate_mock_summary(content: str, length: str = "medium") -> Dict:
        """
        Generate a mock summary (until real AI is integrated)
        
        Args:
            content: Text content to summarize
            length: Summary length (short/medium/long)
        
        Returns:
            Dictionary with key_points, detailed_summary, takeaways
        """
        # Truncate content for preview
        preview = content[:500] if len(content) > 500 else content
        
        word_counts = {
            "short": 100,
            "medium": 250,
            "long": 500
        }
        
        target_length = word_counts.get(length, 250)
        
        # Generate mock summary
        return {
            "key_points": [
                "This is a mock key point highlighting the main theme of the content.",
                "Another important aspect discussed in the source material.",
                "A third significant finding or insight from the analysis.",
                "Additional context that helps understand the bigger picture."
            ][:3 if length == "short" else 5],
            "detailed_summary": f"This is a mock {length} summary of approximately {target_length} words. In a real implementation, this would contain an AI-generated comprehensive analysis of the provided content.\n\nThe summary would intelligently extract the most important information, maintain the original context and meaning, and present it in a clear, concise format that respects the requested length parameter.\n\nKey themes, arguments, and conclusions would be preserved while removing redundant information and focusing on what matters most to the reader.",
            "takeaways": [
                "First actionable insight or recommendation based on the content.",
                "Second important takeaway for practical application.",
                "Third key lesson or conclusion to remember."
            ][:2 if length == "short" else 3]
        }
