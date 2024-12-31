"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from 'framer-motion'
import {
  Heart,
  MessageCircle,
  Repeat2,
  Share2,
  ExternalLink,
} from "lucide-react";
import { Link } from "react-router-dom";

import { usePostStore } from "@/Stores/usePostStore";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Textarea } from "@/components/ui/textarea";

export function PostActions({
  likesCount,
  commentsCount,
  hasLiked,
  postId,
  onLikeClick,
  likesLoading,
}) {
  const [comment, setComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [localComments, setLocalComments] = useState([])




  const { getPostById , postComment } = usePostStore();
  const user = JSON.parse(localStorage.getItem("user") || "null");
 
  const initialPostDataFetched = useRef(false);
  const handleCommentSubmit = async () => {
    if (isSubmitting || !comment.trim()) return
    setIsSubmitting(true)

    try {
      const newComment = await postComment(postId, { text: comment })
      setLocalComments([newComment, ...localComments])
      setComment("")
      setIsDialogOpen(false)
    } catch (error) {
      console.error("Error posting comment:", error)
    } finally {
      setIsSubmitting(false)
    }
  }
  return (
    <div className="flex items-center justify-between pt-3 text-zinc-400">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsDialogOpen(true)}
              className="hover:text-blue-400 focus-visible:text-blue-400 transition group"
              aria-label="Comment on post"
            >
              <MessageCircle className="w-5 h-5 transition-transform group-hover:scale-110 group-focus-visible:scale-110" />
              {commentsCount !== undefined && (
                <span className="ml-2 text-sm font-medium">
                  {commentsCount < 0 ? 0 : commentsCount}
                </span>
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Comment on post</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {}}
              className="hover:text-green-400 focus-visible:text-green-400 transition group"
              aria-label="Repost"
            >
              <Repeat2 className="w-5 h-5 transition-transform group-hover:scale-110 group-focus-visible:scale-110" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Repost</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
          <Button
              variant="ghost"
              size="sm"
              onClick={onLikeClick}
              disabled={likesLoading}
              className={`flex items-center space-x-2 ${
                hasLiked ? 'text-red-500 hover:text-red-600' : 'text-gray-300 hover:text-gray-100'
              }`}
              aria-label={hasLiked ? 'Unlike post' : 'Like post'}
            >
              <AnimatePresence mode="wait">
                {likesLoading ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="w-5 h-5 border-2 border-t-2 border-red-500 border-solid rounded-full animate-spin"
                  />
                ) : (
                  <motion.div
                    key="heart"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Heart className={`w-5 h-5 ${hasLiked ? 'fill-current' : ''}`} />
                  </motion.div>
                )}
              </AnimatePresence>
              <span className="sr-only md:not-sr-only">{likesCount}</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{hasLiked ? "Unlike post" : "Like post"}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {}}
              className="hover:text-purple-400 focus-visible:text-purple-400 transition group"
              aria-label="Share post"
            >
              <Share2 className="w-5 h-5 transition-transform group-hover:scale-110 group-focus-visible:scale-110" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Share post</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="hover:text-blue-400 focus-visible:text-blue-400 transition group"
            >
              <Link to={`/post/${postId}`}>
                <ExternalLink className="w-5 h-5 transition-transform group-hover:scale-110 group-focus-visible:scale-110" />
                <span className="sr-only">Visit post page</span>
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Visit post page</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <AnimatePresence>
        {isDialogOpen && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Write a Comment</DialogTitle>
                <DialogDescription>
                  Share your thoughts about this post.
                </DialogDescription>
              </DialogHeader>
              <Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your comment here..."
                className="min-h-[100px]"
              />
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleCommentSubmit}
                  disabled={isSubmitting || !comment.trim()}
                >
                  {isSubmitting ? "Posting..." : "Post Comment"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  );
}
