import api from './api';

export const promptService = {
  // Generate a prompt
  generate: async (data) => {
    try {
      const response = await api.post('/api/v1/prompts/generate', data);
      return response.data;
    } catch (error) {
      console.error('API generation failed, using client-side generator:', error);
      throw error;
    }
  },

  // Perform AI operations (Improve, Rewrite, Translate, etc.)
  transform: async (action, promptId, content, additionalContext) => {
    const response = await api.post(`/api/v1/prompts/${promptId}/${action}`, {
      content,
      additional_context: additionalContext,
    });
    return response.data;
  },

  // Save prompt
  save: async (promptData) => {
    const response = await api.post('/api/v1/prompts', promptData);
    return response.data;
  },

  // List all user prompts
  getMyPrompts: async (params = {}) => {
    const response = await api.get('/api/v1/prompts', { params });
    return response.data;
  },

  // Get single prompt details
  getPromptById: async (id) => {
    const response = await api.get(`/api/v1/prompts/${id}`);
    return response.data;
  },

  // Toggle favorite status
  toggleFavorite: async (id) => {
    const response = await api.post(`/api/v1/prompts/${id}/favorite`);
    return response.data;
  },

  // Delete a prompt
  deletePrompt: async (id) => {
    const response = await api.delete(`/api/v1/prompts/${id}`);
    return response.data;
  },

  // Get explore prompts (public gallery)
  getPublicPrompts: async (params = {}) => {
    const response = await api.get('/api/v1/prompts/explore', { params });
    return response.data;
  },

  // Get categories
  getCategories: async () => {
    const response = await api.get('/api/v1/categories');
    return response.data;
  },

  // Get templates
  getTemplates: async () => {
    const response = await api.get('/api/v1/templates');
    return response.data;
  },
};

export default promptService;
