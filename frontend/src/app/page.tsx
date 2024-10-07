"use client";
import React, { useState } from "react";
import { Calendar, ShoppingCart, ChefHat, Scan, Home, Settings } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/app/components/ui/dialog";
import { motion } from "framer-motion";

export default function MealPlannerApp() {
  const [activeTab, setActiveTab] = useState("home");
  const [isQRDialogOpen, setIsQRDialogOpen] = useState(false);
  const [scanning, setScanning] = useState(false);

  const bottomTabs = [
    { id: "home", icon: Home, label: "Home" },
    { id: "scan", icon: Scan, label: "Scan" },
    { id: "settings", icon: Settings, label: "Settings" },
  ];

  const handleScan = () => {
    setIsQRDialogOpen(true);
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
    }, 2000);
  };

  const tabVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: 50, transition: { duration: 0.3 } },
  };

  return (
    <div className="mobile-container bg-white h-screen flex flex-col">
      <div className="flex-1 overflow-auto pb-16">
        <header className="p-4">
          <h1 className="text-black text-2xl font-bold mb-2">PantryPal</h1>
          <p className="text-gray-600">Smart meal planning, less waste</p>
        </header>

        <motion.main
          className="p-4"
          key={activeTab}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={tabVariants}
        >
          {activeTab === "home" && <HomeContent setActiveTab={setActiveTab} />}
          {activeTab === "meal-plan" && <MealPlanContent />}
          {activeTab === "inventory" && <InventoryContent />}
          {activeTab === "settings" && <SettingsContent />}
          {activeTab === "recipes" && <RecipesContent />}
        </motion.main>
      </div>

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 w-full max-w-[375px] mx-auto bg-white border-t border-gray-200">
        <div className="flex justify-around items-center h-16">
          {bottomTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => (tab.id === "scan" ? handleScan() : setActiveTab(tab.id))}
              className={`flex flex-col items-center justify-center flex-1 h-full ${
                activeTab === tab.id ? "text-blue-600" : "text-gray-600"
              }`}
            >
              <tab.icon className="w-6 h-6 mb-1" />
              <span className="text-xs">{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* QR Scanner Dialog */}
      <Dialog open={isQRDialogOpen} onOpenChange={setIsQRDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Scan Product</DialogTitle>
          </DialogHeader>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center justify-center p-4"
          >
            {scanning ? (
              <div className="w-64 h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="animate-pulse text-center">
                  <Scan className="w-12 h-12 mx-auto mb-2 text-blue-600" />
                  <p>Scanning...</p>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <p className="mb-4">Product scanned successfully!</p>
                <button
                  onClick={() => setIsQRDialogOpen(false)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                  Add to Inventory
                </button>
              </div>
            )}
          </motion.div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Home Content Component
function HomeContent({ setActiveTab,
}: {
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div>
      <h2 className="text-black text-xl font-semibold mb-4">Welcome!</h2>
      <div className="grid grid-cols-2 gap-4">
        <QuickActionCard
          icon={Calendar}
          title="Meal Plan"
          description="Manage your weekly plan"
          onClick={() => setActiveTab("meal-plan")} // Navigate to Meal Plan
        />
        <QuickActionCard
          icon={ShoppingCart}
          title="Inventory"
          description="Check your pantry"
          onClick={() => setActiveTab("inventory")} // Navigate to Inventory
        />
        <QuickActionCard
          icon={ChefHat}
          title="Recipes"
          description="Find new recipes"
          onClick={() => setActiveTab("recipes")} // Navigate to Recipes
        />
      </div>
    </div>
  );
}

type QuickActionCardProps = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;    
  description: string;    
  onClick?: () => void;     
};

// Quick Action Card Component
function QuickActionCard({ icon: Icon, title, description, onClick }: QuickActionCardProps) {
  return (
    <Card onClick={onClick} className="hover:shadow-lg transition-shadow bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg">
      <CardContent className="p-4">
        <Icon className="w-8 h-8 mb-2 text-blue-600" />
        <h3 className="font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </CardContent>
    </Card>
  );
}

// Meal Plan Content Component
function MealPlanContent() {
  return (
    <div>
      <h2 className="text-black text-xl font-semibold mb-4">This Week&apos;s Meal Plan</h2>
      <div className="space-y-4">
        <MealCard
          day="Monday"
          meal="Grilled Chicken Salad"
          time="30 min"
          ingredients={["Chicken breast", "Mixed greens", "Cherry tomatoes"]}
        />
        <MealCard
          day="Tuesday"
          meal="Veggie Stir Fry"
          time="25 min"
          ingredients={["Rice", "Mixed vegetables", "Tofu"]}
        />
      </div>
    </div>
  );
}

// Inventory Content Component
function InventoryContent() {
  return (
    <div className="text-black">
      <h2 className="text-xl font-semibold mb-4">Pantry Inventory</h2>
      <div className="space-y-4">
        <InventoryCategory
          category="Produce"
          items={[
            { name: "Apples", quantity: 5, expiry: "3 days" }, 
            { name: "Spinach", quantity: 1, expiry: "5 days" },
          ]}
        />
        <InventoryCategory
          category="Proteins"
          items={[
            { name: "Chicken breast", quantity: 2, expiry: "2 days" }, 
            { name: "Eggs", quantity: 8, expiry: "1 week" },
          ]}
        />
      </div>
    </div>
  );
}


// Settings Content Component
function SettingsContent() {
  return (
    <div className="text-black">
      <h2 className="text-xl font-semibold mb-4">Settings</h2>
      <div className="space-y-4">
        <SettingsItem title="Notifications" description="Manage your alerts" />
        <SettingsItem title="Account" description="Update your profile" />
        <SettingsItem title="Help & Support" description="Get assistance" />
      </div>
    </div>
  );
}
type SettingsItemProps = {
  title: string;        
  description: string; 
};

// Settings Item Component
function SettingsItem({ title, description }: SettingsItemProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </CardContent>
    </Card>
  );
}
type MealCardProps = {
  day: string;      
  meal: string;             
  time: string;      
  ingredients: string[];    
};
// Meal Card Component
function MealCard({ day, meal, time, ingredients }: MealCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>{day}</span>
          <span className="flex items-center text-sm font-normal text-gray-600">
            {time}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <h3 className="font-semibold">{meal}</h3>
        <p className="text-sm text-gray-600">Ingredients: {ingredients.join(", ")}</p>
      </CardContent>
    </Card>
  );
}
type Item = {
  name: string;
  quantity: number; 
  expiry: string;  
};

type InventoryCategoryProps = {
  category: string;
  items: Item[];    
};
// Inventory Category Component
function InventoryCategory({ category, items }: InventoryCategoryProps) {
  return (
    <div>
      <h3 className="font-semibold text-lg">{category}</h3>
      <ul className="list-disc list-inside space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex justify-between">
            <span>{item.name}</span>
            <span>{item.quantity} (Expires in {item.expiry})</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Recipes Content Component
function RecipesContent() {
  return (
    <div className="text-black">
      <h2 className="text-xl font-semibold mb-4">Favorite Recipes</h2>
      <ul className="space-y-2">
        <li>Spaghetti Carbonara</li>
        <li>Vegetable Stir Fry</li>
        <li>Chicken Tacos</li>
      </ul>
    </div>
  );
}
