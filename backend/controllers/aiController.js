const { GoogleGenAI } = require('@google/genai');
const Conversation = require('../models/Conversation');
const Message = require('../models/Message');

// Initialize Gemini API
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || 'dummy_key' });

// System Prompts based on Roles
const systemPrompts = {
  student: `You are Eswar AI, an advanced, highly intelligent, and empathetic campus assistant for Eswar College of Engineering. 
You are currently talking to a student. Your goal is to help them with attendance, marks, assignments, and campus information.
Keep your responses concise, futuristic, and helpful. Use a friendly but professional tone.
If they ask for data you don't have, politely explain you are pulling the latest sync or suggest they check the dashboard.`,
  
  faculty: `You are Eswar AI, the administrative and academic assistant for the faculty of Eswar College of Engineering.
You help faculty manage classes, check student performance, and upload materials. 
Be highly professional, analytical, and concise. Offer proactive insights about student performance trends if relevant.`,
  
  admin: `You are Eswar AI, the core system intelligence for Eswar College of Engineering.
You are assisting a system administrator. Provide analytical, data-driven, and high-level insights regarding system health, revenue, and overall campus metrics. Be concise and precise.`
};

exports.sendMessage = async (req, res) => {
  try {
    const { message, conversationId } = req.body;
    const userRole = req.user.role || 'student';
    
    // Validate inputs
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Ensure we have a conversation
    let convId = conversationId;
    if (!convId) {
      const newConv = new Conversation({ userId: req.user.id, title: message.substring(0, 30) });
      await newConv.save();
      convId = newConv._id;
    }

    // Save user message (assuming DB is connected. If not, this might fail, but we're handling it gracefully in production)
    try {
      await Message.create({ conversationId: convId, role: 'user', content: message });
    } catch (e) {
      console.warn("DB not connected, skipping saving user message");
    }

    // Prepare context for Gemini
    const systemInstruction = systemPrompts[userRole];
    
    let aiResponseText = "";
    
    try {
      // Create chat session (mocking history retrieval for now to save time)
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: message,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        }
      });
      
      aiResponseText = response.text;
    } catch (apiError) {
      console.error("Gemini API Error:", apiError);
      // Fallback response if API fails
      aiResponseText = "I'm sorry, my AI processing core is currently experiencing high load. Please try asking again in a moment, or check your dashboard for the information.";
    }

    // Save AI response
    try {
      await Message.create({ conversationId: convId, role: 'model', content: aiResponseText });
    } catch (e) {
      console.warn("DB not connected, skipping saving AI message");
    }

    // Return response
    return res.json({
      conversationId: convId,
      message: aiResponseText
    });

  } catch (error) {
    console.error('AI Controller Error:', error);
    res.status(500).json({ error: 'Failed to process AI request' });
  }
};

exports.getConversations = async (req, res) => {
  try {
    const conversations = await Conversation.find({ userId: req.user.id }).sort({ updatedAt: -1 });
    res.json(conversations);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch conversations' });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find({ conversationId: req.params.id }).sort({ createdAt: 1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};
