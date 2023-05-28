export type TPost = {
  post_id: string;
  writer: string;
  content: string;
  likes: number;
  reply_ids: number[]; // comment id list
  created_at: string;
  updated_at?: string;
  deleted_at?: string;
};

export type TPostComment = {
  post_id: string;
  reply_id: string;
  writer: string;
  depth: number;
  bundle_id: number;
  bundle_order: number;
  created_at: string;
  updated_at?: string;
  deleted_at?: string;
};
