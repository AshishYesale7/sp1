import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Plus, Save, Trash } from 'lucide-react';

interface VideoSource {
  quality: string;
  url: string;
  type: 'mp4' | 'webm' | 'hls';
}

interface VideoSourceForm {
  movieId: string;
  sources: VideoSource[];
}

export default function VideoSourceManagement() {
  const { register, handleSubmit } = useForm<VideoSourceForm>();
  const [sources, setSources] = useState<VideoSource[]>([]);

  const addSource = () => {
    setSources([...sources, { quality: '1080p', url: '', type: 'mp4' }]);
  };

  const removeSource = (index: number) => {
    setSources(sources.filter((_, i) => i !== index));
  };

  const onSubmit = (data: VideoSourceForm) => {
    console.log('Saving video sources:', { ...data, sources });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Video Source Management</h2>
        <button
          onClick={addSource}
          className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 font-semibold hover:bg-red-700"
        >
          <Plus className="h-5 w-5" />
          Add Source
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="rounded-lg bg-gray-800 p-6">
          <div className="space-y-4">
            {sources.map((source, index) => (
              <div key={index} className="flex items-center gap-4">
                <select
                  className="rounded-lg bg-gray-700 px-4 py-2"
                  {...register(`sources.${index}.quality`)}
                >
                  <option value="4K">4K</option>
                  <option value="1080p">1080p</option>
                  <option value="720p">720p</option>
                  <option value="480p">480p</option>
                </select>

                <select
                  className="rounded-lg bg-gray-700 px-4 py-2"
                  {...register(`sources.${index}.type`)}
                >
                  <option value="mp4">MP4</option>
                  <option value="webm">WEBM</option>
                  <option value="hls">HLS</option>
                </select>

                <input
                  type="url"
                  placeholder="Video URL"
                  className="flex-1 rounded-lg bg-gray-700 px-4 py-2"
                  {...register(`sources.${index}.url`)}
                />

                <button
                  type="button"
                  onClick={() => removeSource(index)}
                  className="rounded-lg p-2 hover:bg-gray-600"
                >
                  <Trash className="h-5 w-5 text-red-500" />
                </button>
              </div>
            ))}
          </div>

          {sources.length > 0 && (
            <button
              type="submit"
              className="mt-6 flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 font-semibold hover:bg-red-700"
            >
              <Save className="h-5 w-5" />
              Save Sources
            </button>
          )}
        </div>
      </form>
    </div>
  );
}