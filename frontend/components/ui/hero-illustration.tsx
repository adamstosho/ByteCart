"use client"

import { motion } from "framer-motion"
import { ShoppingCart, Clock, Bell, CheckCircle } from "lucide-react"

export function HeroIllustration() {
  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="relative bg-white rounded-2xl shadow-2xl p-6 border border-gray-200"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-gray-900">ByteCart+</span>
          </div>
          <div className="flex space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          </div>
        </div>

        <div className="space-y-4">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">🍎</span>
              </div>
              <div>
                <div className="font-medium text-gray-900">Fresh Apples</div>
                <div className="text-sm text-gray-500">Expires in 5 days</div>
              </div>
            </div>
            <CheckCircle className="w-5 h-5 text-green-500" />
          </motion.div>

          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">🥛</span>
              </div>
              <div>
                <div className="font-medium text-gray-900">Milk</div>
                <div className="text-sm text-gray-500">Expires tomorrow</div>
              </div>
            </div>
            <Bell className="w-5 h-5 text-yellow-500" />
          </motion.div>

          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">🥩</span>
              </div>
              <div>
                <div className="font-medium text-gray-900">Ground Beef</div>
                <div className="text-sm text-gray-500">Expired today</div>
              </div>
            </div>
            <Clock className="w-5 h-5 text-red-500" />
          </motion.div>
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="mt-6 p-3 bg-gray-50 rounded-lg"
        >
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Items tracked: 24</span>
            <span className="text-green-600">Waste saved: 85%</span>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20"
      />
      <motion.div
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20"
      />
    </div>
  )
} 