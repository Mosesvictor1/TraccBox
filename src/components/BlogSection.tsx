import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Book } from "lucide-react";

const blogPosts = [
  {
    title: "5 Ways to Motivate Your Field Sales Team",
    summary:
      "Discover proven techniques to keep your sales representatives engaged and motivated while in the field.",
    image: "assets/blog1.png",
    date: "May 10, 2025",
    readTime: "5 min read",
  },
  {
    title: "Leveraging Data Analytics for Better Sales Performance",
    summary:
      "Learn how to use data-driven insights to optimize your sales process and increase your team's effectiveness.",
    image: "assets/blog2.png",
    date: "May 8, 2025",
    readTime: "7 min read",
  },
  {
    title: "The Future of Field Sales Technology",
    summary:
      "Explore upcoming trends in field sales technology and how they'll transform the industry in the coming years.",
    image: "assets/blog3.png",
    date: "May 5, 2025",
    readTime: "6 min read",
  },
];

const BlogSection = () => {
  return (
    <section id="blog" className="py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <h2
              className="text-3xl md:text-4xl font-bold mb-2"
              data-aos="fade-up"
            >
              Sales Resources & Tips
            </h2>
            <p className="text-gray-600" data-aos="fade-up">
              Stay updated with the latest insights on field sales management.
            </p>
          </div>
          <div className="mt-4 md:mt-0" data-aos="zoom-in">
            <Button
              variant="outline"
              className="border-traccbox-500 text-traccbox-500"
            >
              View All Articles <ArrowRight size={16} className="ml-2" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <Card
              key={index}
              className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border-gray-200 h-full flex flex-col"
              data-aos="zoom-in"
              data-aos-delay={`${(index % 3) * 100}`}
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>

              <CardHeader>
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <Book size={14} className="mr-1" />
                  <span>
                    {post.date} • {post.readTime}
                  </span>
                </div>
                <h3 className="text-xl font-semibold leading-tight">
                  {post.title}
                </h3>
              </CardHeader>

              <CardContent className="flex-grow">
                <p className="text-gray-600">{post.summary}</p>
              </CardContent>

              <CardFooter>
                <Button
                  variant="ghost"
                  className="text-traccbox-500 p-0 hover:bg-transparent hover:text-traccbox-600"
                >
                  Read More <ArrowRight size={14} className="ml-1" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
