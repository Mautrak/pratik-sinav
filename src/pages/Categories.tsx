import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { subjects } from "@/types/categories";

const Categories = () => {
  const navigate = useNavigate();

  const handleTopicClick = (subjectId: string, topicId: string) => {
    console.log("Navigating to question solver:", { subjectId, topicId });
    navigate(`/question-solver?subject=${subjectId}&topic=${topicId}`);
  };

  const handleSubjectClick = (subjectId: string) => {
    console.log("Navigating to first topic of subject:", subjectId);
    const subject = subjects.find((s) => s.id === subjectId);
    if (subject && subject.topics.length > 0) {
      handleTopicClick(subjectId, subject.topics[0].id);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-primary mb-8">Dersler ve Konular</h1>
      
      <Tabs defaultValue="TYT" className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="TYT">TYT</TabsTrigger>
          <TabsTrigger value="AYT">AYT</TabsTrigger>
        </TabsList>

        {["TYT", "AYT"].map((examType) => (
          <TabsContent key={examType} value={examType}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {subjects
                .filter((subject) => subject.examType === examType)
                .map((subject) => (
                  <Card 
                    key={subject.id} 
                    className="hover:shadow-lg transition-shadow"
                    onClick={() => handleSubjectClick(subject.id)}
                  >
                    <CardHeader>
                      <CardTitle className="text-xl text-primary cursor-pointer">
                        {subject.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {subject.topics.map((topic) => (
                          <li
                            key={topic.id}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleTopicClick(subject.id, topic.id);
                            }}
                            className="p-2 hover:bg-accent rounded-md transition-colors cursor-pointer"
                          >
                            <p className="font-medium">{topic.name}</p>
                            {topic.description && (
                              <p className="text-sm text-muted-foreground">
                                {topic.description}
                              </p>
                            )}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default Categories;