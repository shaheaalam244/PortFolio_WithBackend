import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Plus, LogOut } from "lucide-react";

const ADMIN_PASSWORD = "ShaheSabina31280412";

export default function Admin() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [resume, setResume] = useState<File | null>(null);
  const [skillName, setSkillName] = useState("");
  const [skillFounderOf, setSkillFounderOf] = useState("");
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDesc, setProjectDesc] = useState("");
  const [projectImage, setProjectImage] = useState<File | null>(null);
  const [projectLiveUrl, setProjectLiveUrl] = useState("");
  const [projectRepoUrl, setProjectRepoUrl] = useState("");
  const [skills, setSkills] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [stats, setStats] = useState<any[]>([]);
  const [resumeInfo, setResumeInfo] = useState<any>(null);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const fetchResumeInfo = async () => {
    try {
      const response = await fetch("/api/admin/resume");
      if (response.ok) {
        const data = await response.json();
        setResumeInfo(data);
      }
    } catch (error) {
      console.error("Failed to fetch resume info:", error);
    }
  };

  useEffect(() => {
    if (authenticated) {
      fetchSkills();
      fetchProjects();
      fetchStats();
      fetchResumeInfo();
    }
  }, [authenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      setPassword("");
      toast({
        title: "Success",
        description: "Logged in successfully",
      });
    } else {
      toast({
        title: "Error",
        description: "Incorrect password",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    setAuthenticated(false);
    setPassword("");
  };

  const uploadProfilePhoto = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profilePhoto) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const response = await fetch("/api/admin/profile-photo", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fileData: event.target?.result,
            fileName: profilePhoto.name,
          }),
        });

        if (response.ok) {
          toast({
            title: "Success",
            description: "Profile photo updated",
          });
          setProfilePhoto(null);
        } else {
          throw new Error("Upload failed");
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to upload profile photo",
          variant: "destructive",
        });
      }
    };
    reader.readAsDataURL(profilePhoto);
  };

  const uploadResume = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resume) return;

    const reader = new FileReader();
    reader.onerror = () => {
      toast({
        title: "Error",
        description: "Failed to read file",
        variant: "destructive",
      });
    };
    reader.onload = async (event) => {
      try {
        const fileData = event.target?.result;
        if (!fileData) {
          throw new Error("No file data");
        }

        console.log("Uploading resume:", resume.name, "Size:", resume.size);

        const response = await fetch("/api/admin/resume", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fileData: fileData,
            fileName: resume.name,
          }),
        });

        console.log("Resume upload response:", response.status);
        const data = await response.json();
        console.log("Resume upload response data:", data);

        if (response.ok) {
          const ext = resume.name.substring(resume.name.lastIndexOf('.')) || '.pdf';
          console.log("Showing success toast");
          toast({
            title: "✅ Success!",
            description: `Resume uploaded! Saved as: resume${ext}`,
          });
          setResume(null);
          fetchResumeInfo();
        } else {
          throw new Error(data.error || "Upload failed");
        }
      } catch (error) {
        console.error("Resume upload error:", error);
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : "Failed to upload resume",
          variant: "destructive",
        });
      }
    };
    reader.readAsDataURL(resume);
  };

  const deleteResume = async () => {
    try {
      const response = await fetch("/api/admin/resume", {
        method: "DELETE",
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Resume deleted",
        });
      } else {
        throw new Error("Delete failed");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete resume",
        variant: "destructive",
      });
    }
  };

  const fetchSkills = async () => {
    try {
      const response = await fetch("/api/admin/skills");
      if (response.ok) {
        const data = await response.json();
        setSkills(data.skills || []);
      }
    } catch (error) {
      console.error("Failed to fetch skills:", error);
    }
  };

  const addSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!skillName.trim()) return;

    try {
      const response = await fetch("/api/admin/skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: skillName,
          founderOf: skillFounderOf,
        }),
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Skill added",
        });
        setSkillName("");
        setSkillFounderOf("");
        fetchSkills();
      } else {
        throw new Error("Add failed");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add skill",
        variant: "destructive",
      });
    }
  };

  const removeSkill = async (skillId: string) => {
    try {
      const response = await fetch(`/api/admin/skills/${skillId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Skill removed",
        });
        fetchSkills();
      } else {
        throw new Error("Remove failed");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove skill",
        variant: "destructive",
      });
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/admin/projects");
      if (response.ok) {
        const data = await response.json();
        console.log("Fetched projects:", data.projects);
        setProjects(data.projects || []);
      } else {
        console.error("Failed to fetch projects, status:", response.status);
      }
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    }
  };

  const uploadProjectImage = async (file: File): Promise<string> => {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onload = async (event) => {
        try {
          const response = await fetch("/api/admin/project-image", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              fileData: event.target?.result,
              fileName: file.name,
            }),
          });

          if (response.ok) {
            const data = await response.json();
            resolve(data.path);
          } else {
            reject(new Error("Upload failed"));
          }
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = () => reject(new Error("File reading failed"));
      reader.readAsDataURL(file);
    });
  };

  const addProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectTitle.trim() || !projectDesc.trim()) return;

    setUploading(true);
    try {
      let imagePath = "";
      if (projectImage) {
        imagePath = await uploadProjectImage(projectImage);
      }

      const response = await fetch("/api/admin/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: projectTitle,
          description: projectDesc,
          image: imagePath,
          liveUrl: projectLiveUrl,
          repoUrl: projectRepoUrl,
          badge: "Custom",
          highlights: [],
          tags: [],
          company: "Personal Project",
          year: new Date().getFullYear().toString(),
        }),
      });

      if (response.ok) {
        console.log("Project added successfully");
        toast({
          title: "Success",
          description: "Project added",
        });
        setProjectTitle("");
        setProjectDesc("");
        setProjectImage(null);
        setProjectLiveUrl("");
        setProjectRepoUrl("");
        await fetchProjects();
        console.log("Projects fetched after add");
      } else {
        throw new Error("Add failed");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add project",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const deleteProject = async (projectId: string) => {
    try {
      const response = await fetch(`/api/admin/projects/${projectId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Project deleted",
        });
        fetchProjects();
      } else {
        throw new Error("Delete failed");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete project",
        variant: "destructive",
      });
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/admin/stats");
      if (response.ok) {
        const data = await response.json();
        setStats(data.stats || []);
      }
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    }
  };

  const updateStat = async (statId: string, value: string, label: string, description: string) => {
    try {
      const response = await fetch(`/api/admin/stats/${statId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value, label, description }),
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Stat updated",
        });
        fetchStats();
      } else {
        throw new Error("Update failed");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update stat",
        variant: "destructive",
      });
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Admin Access</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">Admin Panel</h1>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="resume">Resume</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="stats">Stats</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Update Profile Photo</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={uploadProfilePhoto} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Profile Photo</label>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setProfilePhoto(e.target.files?.[0] || null)}
                      required
                    />
                  </div>
                  <Button type="submit" disabled={!profilePhoto}>
                    Upload Photo
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Resume Tab */}
          <TabsContent value="resume">
            <Card>
              <CardHeader>
                <CardTitle>Manage Resume</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <form onSubmit={uploadResume} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Upload Resume</label>
                    <Input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => setResume(e.target.files?.[0] || null)}
                    />
                  </div>
                  <Button type="submit" disabled={!resume}>
                    Upload Resume
                  </Button>
                </form>
                {resumeInfo?.exists && (
                  <div className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded">
                    <p className="text-sm text-green-400">✅ Resume uploaded and ready</p>
                    <p className="text-xs text-gray-400 mt-1">File: {resumeInfo.fileName}</p>
                    <a
                      href={resumeInfo.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-400 hover:underline mt-2 inline-block"
                    >
                      View/Download Resume
                    </a>
                  </div>
                )}
                <Button variant="destructive" onClick={() => {
                  deleteResume();
                  fetchResumeInfo();
                }}>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Current Resume
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Skills Tab */}
          <TabsContent value="skills">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Add New Skill</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={addSkill} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Skill Name</label>
                      <Input
                        value={skillName}
                        onChange={(e) => setSkillName(e.target.value)}
                        placeholder="e.g., React, Python"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Founder Of</label>
                      <Input
                        value={skillFounderOf}
                        onChange={(e) => setSkillFounderOf(e.target.value)}
                        placeholder="e.g., Web Development"
                      />
                    </div>
                    <Button type="submit">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Skill
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Current Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {skills.length === 0 ? (
                      <p className="text-gray-400">No skills added yet</p>
                    ) : (
                      skills.map((skill: any) => (
                        <div key={skill.id} className="flex justify-between items-center p-3 bg-slate-800 rounded">
                          <div>
                            <p className="font-medium">{skill.name}</p>
                            {skill.founderOf && (
                              <p className="text-sm text-gray-400">Founder of {skill.founderOf}</p>
                            )}
                          </div>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => removeSkill(skill.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Add New Project</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={addProject} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Project Title</label>
                      <Input
                        value={projectTitle}
                        onChange={(e) => setProjectTitle(e.target.value)}
                        placeholder="Project name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Description</label>
                      <textarea
                        value={projectDesc}
                        onChange={(e) => setProjectDesc(e.target.value)}
                        placeholder="Project description"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        rows={3}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Project Image</label>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setProjectImage(e.target.files?.[0] || null)}
                      />
                      {projectImage && (
                        <p className="text-xs text-gray-400 mt-1">
                          Selected: {projectImage.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Live URL</label>
                      <Input
                        value={projectLiveUrl}
                        onChange={(e) => setProjectLiveUrl(e.target.value)}
                        placeholder="https://example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Repository URL</label>
                      <Input
                        value={projectRepoUrl}
                        onChange={(e) => setProjectRepoUrl(e.target.value)}
                        placeholder="https://github.com/..."
                      />
                    </div>
                    <Button type="submit" disabled={uploading}>
                      <Plus className="w-4 h-4 mr-2" />
                      {uploading ? "Uploading..." : "Add Project"}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Current Projects</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {projects.length === 0 ? (
                      <p className="text-gray-400">No projects added yet</p>
                    ) : (
                      projects.map((project: any) => (
                        <div key={project.id} className="p-4 bg-slate-800 rounded">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium text-white">{project.title}</p>
                              <p className="text-sm text-gray-400 mt-1">{project.description}</p>
                              {project.liveUrl && (
                                <a
                                  href={project.liveUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-400 text-sm hover:underline mt-2 inline-block"
                                >
                                  View Live
                                </a>
                              )}
                            </div>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => deleteProject(project.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Stats Tab */}
          <TabsContent value="stats">
            <Card>
              <CardHeader>
                <CardTitle>Edit Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {stats.map((stat: any) => (
                    <div key={stat.id} className="p-4 bg-slate-800 rounded space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-sm font-medium mb-1">Label</label>
                          <Input
                            value={stat.label}
                            onChange={(e) => {
                              const updated = stats.map((s: any) =>
                                s.id === stat.id ? { ...s, label: e.target.value } : s
                              );
                              setStats(updated);
                            }}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Value</label>
                          <Input
                            value={stat.value}
                            onChange={(e) => {
                              const updated = stats.map((s: any) =>
                                s.id === stat.id ? { ...s, value: e.target.value } : s
                              );
                              setStats(updated);
                            }}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <textarea
                          value={stat.description}
                          onChange={(e) => {
                            const updated = stats.map((s: any) =>
                              s.id === stat.id ? { ...s, description: e.target.value } : s
                            );
                            setStats(updated);
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          rows={2}
                        />
                      </div>
                      <Button
                        onClick={() =>
                          updateStat(stat.id, stat.value, stat.label, stat.description)
                        }
                      >
                        Save Changes
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
