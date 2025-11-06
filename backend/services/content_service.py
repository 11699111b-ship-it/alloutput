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
    
    @staticmethod
    def generate_mock_posts(platform: str, topic: str, tone: str, length: str) -> list:
        """
        Generate mock social media posts (until real AI is integrated)
        
        Args:
            platform: linkedin or twitter
            topic: Post topic/theme
            tone: professional, casual, humorous, inspirational
            length: short, medium, long
        
        Returns:
            List of 3 post variants with content, character count, and hashtags
        """
        # Character limits and structures
        if platform == "linkedin":
            char_limits = {
                "short": 200,
                "medium": 400,
                "long": 600
            }
            max_limit = 3000
        else:  # twitter
            char_limits = {
                "short": 140,
                "medium": 240,
                "long": 280  # Will be thread format
            }
            max_limit = 280
        
        target_chars = char_limits.get(length, 400)
        
        # Generate 3 variants with different approaches
        variants = []
        
        # Variant 1: Question-based
        if platform == "linkedin":
            content_1 = f"Ever wondered about {topic}?\n\n🤔 Here's what I've learned:\n\n• Key insight about {topic} that challenges conventional thinking\n• Why this matters for professionals in our industry\n• Practical steps you can take starting today\n\nWhat's your experience with {topic}? Share in the comments!"
            hashtags_1 = [f"#{topic.replace(' ', '')}", "#Leadership", "#Innovation", "#ProfessionalDevelopment"]
        else:
            content_1 = f"🧵 Thread on {topic}\n\n1/ {topic} is transforming how we work. Here's what you need to know:\n\n2/ The key insight that changed my perspective...\n\n3/ What this means for you 👇"
            hashtags_1 = [f"#{topic.replace(' ', '')[:20]}", "#Thread", "#Tech"]
        
        variants.append({
            "id": 1,
            "content": content_1,
            "character_count": len(content_1),
            "hashtags": hashtags_1
        })
        
        # Variant 2: Story-based
        if platform == "linkedin":
            content_2 = f"I recently had an eye-opening experience with {topic}.\n\nThe situation: [Context about your experience]\n\nThe challenge: [What you faced]\n\nThe result: [What you learned]\n\n💡 Three lessons I took away:\n1. [First lesson]\n2. [Second lesson]\n3. [Third lesson]\n\nHave you faced something similar?"
            hashtags_2 = [f"#{topic.replace(' ', '')}", "#CareerGrowth", "#LessonsLearned"]
        else:
            content_2 = f"Hot take on {topic}:\n\nMost people get this wrong.\n\nHere's what actually works:\n\n[Key insight in 2-3 sentences that challenges the norm]\n\nAgree or disagree? 👇"
            hashtags_2 = [f"#{topic.replace(' ', '')[:20]}", "#HotTake"]
        
        variants.append({
            "id": 2,
            "content": content_2,
            "character_count": len(content_2),
            "hashtags": hashtags_2
        })
        
        # Variant 3: List/Tips format
        if platform == "linkedin":
            content_3 = f"5 game-changing insights about {topic} 🚀\n\nAfter years of experience, here's what actually moves the needle:\n\n1️⃣ [First powerful insight]\n2️⃣ [Second key strategy]\n3️⃣ [Third proven approach]\n4️⃣ [Fourth essential tip]\n5️⃣ [Fifth breakthrough idea]\n\nWhich one resonates most with you?\n\nP.S. Save this post for later!"
            hashtags_3 = [f"#{topic.replace(' ', '')}", "#Tips", "#Strategy", "#Success"]
        else:
            content_3 = f"5 quick wins for {topic}:\n\n1. [First tip]\n2. [Second tip]\n3. [Third tip]\n4. [Fourth tip]\n5. [Fifth tip]\n\nWhich one will you try first?"
            hashtags_3 = [f"#{topic.replace(' ', '')[:20]}", "#Tips", "#Quick"]
        
        variants.append({
            "id": 3,
            "content": content_3,
            "character_count": len(content_3),
            "hashtags": hashtags_3
        })
        
        return variants
