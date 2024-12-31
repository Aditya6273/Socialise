/* eslint-disable react/prop-types */


import { useState } from 'react'
import { Heart, MessageCircle, Share2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"


export const PostActions = ({
  likesCount,
  commentsCount,
  hasLiked,
  onLikeClick,
  likesLoading
}) => {
  const [isSharing, setIsSharing] = useState(false)

  const handleShareClick = () => {
    setIsSharing(true)
    // Simulating share action
    setTimeout(() => setIsSharing(false), 2000)
  }

  return (
    <div className="flex items-center justify-between pt-6 border-t border-zinc-800">
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
            <p>{hasLiked ? 'Unlike' : 'Like'} this post</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center space-x-2 text-gray-300 hover:text-gray-100"
              aria-label="View comments"
            >
              <MessageCircle className="w-5 h-5" />
              <span className="sr-only md:not-sr-only">{commentsCount}</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>View comments</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleShareClick}
              disabled={isSharing}
              className="flex items-center space-x-2 text-gray-300 hover:text-gray-100"
              aria-label="Share post"
            >
              <AnimatePresence mode="wait">
                {isSharing ? (
                  <motion.div
                    key="sharing"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="w-5 h-5 border-2 border-t-2 border-green-500 border-solid rounded-full animate-spin"
                  />
                ) : (
                  <Share2 className="w-5 h-5" />
                )}
              </AnimatePresence>
              <span className="sr-only md:not-sr-only">Share</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Share this post</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}

