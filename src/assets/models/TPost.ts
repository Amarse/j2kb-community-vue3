export type TPost = {
  post_id: string;
  writer: string;
  content: string;
  views: number;
  likes: number;
  reply_ids: string[]; // reply id list
  created_at: string;
  updated_at?: string;
  deleted_at?: string;
};

export type TPostReply = {
  post_id: string;
  reply_id: string;
  writer: string;
  content: string;
  depth: number;
  bundle_id: number;
  bundle_order: number;
  created_at: string;
  updated_at?: string;
  deleted_at?: string;
};
