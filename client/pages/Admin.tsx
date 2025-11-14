d andimport { useState, useEffect } from "react";
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
  const [currentProfilePhoto, setCurrentProfilePhoto] = useState<string | null>(null);
  const [resume, setResume] = useState<File | null>(null);
  const [skillName, setSkillName] = useState("");
  const [skillFounderOf, setSkillFounderOf] = useState("");
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDesc, setProjectDesc] = useState("");
  const [projectImage, setProjectImage] = useState<File | null>(null);
  const [projectLiveUrl, setProjectLiveUrl] = useState("");
  const [projectRepoUrl, setProjectRepoUrl] = useState("");
  const [editingProject, setEditingProject] = useState<any | null>(null);
  const [skills, setSkills] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [stats, setStats] = useState<any[]>([]);
  const [resumes, setResumes] = useState<any[]>([]);
  const [experiences, setExperiences] = useState<any[]>([]);
  const [education, setEducation] = useState<any[]>([]);

  // Experience form states
  const [expTitle, setExpTitle] = useState("");
  const [expOrganisation, setExpOrganisation] = useState("");
  const [expPeriod, setExpPeriod] = useState("");
  const [expStatus, setExpStatus] = useState("");
  const [expDescription, setExpDescription] = useState("");
  const [expSkills, setExpSkills] = useState("");

  // Education form states
  const [eduPeriod, setEduPeriod] = useState("");
  const [eduTitle, setEduTitle] = useState("");
  const [eduInstitution, setEduInstitution] = useState("");
  const [eduDetail, setEduDetail] = useState("");
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const fetchResumes = async () => {
    try {
      const response = await fetch("/api/admin/resumes");
      if (response.ok) {
        const data = await response.json();
        setResumes(data.resumes || []);
      }
    } catch (error) {
      console.error("Failed to fetch resumes:", error);
    }
  };

  const fetchProfilePhoto = async () => {
    try {
      const response = await fetch("/api/admin/profile-photo");
      if (response.ok) {
        const data = await response.json();
        setCurrentProfilePhoto(data.path || null);
      }
    } catch (error) {
      console.error("Failed to fetch profile photo:", error);
    }
  };

  useEffect(() => {
    if (authenticated) {
      fetchSkills();
      fetchProjects();
      fetchStats();
      fetchResumes();
      fetchProfilePhoto();
      fetchExperiences();
      fetchEducation();
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

    const formData = new FormData();
    formData.append('profile', profilePhoto);

    try {
      console.log("Uploading profile photo:", profilePhoto.name, "Size:", profilePhoto.size);

      const response = await fetch("/api/admin/profile-photo-upload", {
        method: "POST",
        body: formData,
      });

      console.log("Profile photo upload response:", response.status);
      const data = await response.json();
      console.log("Profile photo upload response data:", data);

      if (response.ok) {
        console.log("Showing success toast");
        toast({
          title: "✅ Success!",
          description: `Profile photo updated successfully!`,
        });
        setProfilePhoto(null);
        fetchProfilePhoto();
      } else {
        throw new Error(data.error || "Upload failed");
      }
    } catch (error) {
      console.error("Profile photo upload error:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to upload profile photo",
        variant: "destructive",
      });
    }
  };

  const uploadResume = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resume) return;

    const formData = new FormData();
    formData.append('resume', resume);

    try {
      console.log("Uploading resume:", resume.name, "Size:", resume.size);

      const response = await fetch("/api/admin/resume", {
        method: "POST",
        body: formData,
      });

      console.log("Resume upload response:", response.status);
      const data = await response.json();
      console.log("Resume upload response data:", data);

      if (response.ok) {
        console.log("Showing success toast");
        toast({
          title: "✅ Success!",
          description: `Resume uploaded successfully!`,
        });
        setResume(null);
        fetchResumes();
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

  const deleteResume = async (fileName: string) => {
    try {
      const response = await fetch(`/api/admin/resume/${fileName}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Resume deleted",
        });
        fetchResumes();
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

  const fetchExperiences = async () => {
    try {
      const response = await fetch("/api/admin/experiences");
      if (response.ok) {
        const data = await response.json();
        setExperiences(data.experiences || []);
      }
    } catch (error) {
      console.error("Failed to fetch experiences:", error);
    }
  };

  const fetchEducation = async () => {
    try {
      const response = await fetch("/api/admin/education");
      if (response.ok) {
        const data = await response.json();
        setEducation(data.education || []);
      }
    } catch (error) {
      console.error("Failed to fetch education:", error);
    }
  };

  const addExperience = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!expTitle.trim() || !expOrganisation.trim() || !expPeriod.trim() || !expDescription.trim()) return;

    try {
      const response = await fetch("/api/admin/experiences", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: expTitle,
          organisation: expOrganisation,
          period: expPeriod,
          status: expStatus,
          description: expDescription,
          skills: expSkills.split(",").map(s => s.trim()).filter(s => s),
        }),
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Experience added",
        });
        setExpTitle("");
        setExpOrganisation("");
        setExpPeriod("");
        setExpStatus("");
        setExpDescription("");
        setExpSkills("");
        fetchExperiences();
      } else {
        throw new Error("Add failed");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add experience",
        variant: "destructive",
      });
    }
  };

  const addEducation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!eduTitle.trim() || !eduInstitution.trim() || !eduPeriod.trim()) return;

    try {
      const response = await fetch("/api/admin/education", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: eduTitle,
          institution: eduInstitution,
          period: eduPeriod,
          detail: eduDetail,
        }),
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Education added",
        });
        setEduTitle("");
        setEduInstitution("");
        setEduPeriod("");
        setEduDetail("");
        fetchEducation();
      } else {
        throw new Error("Add failed");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add education",
        variant: "destructive",
      });
    }
  };

  const removeExperience = async (expId: string) => {
    try {
      const response = await fetch(`/api/admin/experiences/${expId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Experience removed",
        });
        fetchExperiences();
      } else {
        throw new Error("Remove failed");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove experience",
        variant: "destructive",
      });
    }
  };

  const removeEducation = async (eduId: string) => {
    try {
      const response = await fetch(`/api/admin/education/${eduId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Education removed",
        });
        fetchEducation();
      } else {
        throw new Error("Remove failed");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove education",
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

      const projectData = {
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
      };

      const response = await fetch("/api/admin/projects", {
        method: editingProject ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingProject ? { ...projectData, id: editingProject.id } : projectData),
      });

      if (response.ok) {
        console.log(`Project ${editingProject ? 'updated' : 'added'} successfully`);
        toast({
          title: "Success",
          description: `Project ${editingProject ? 'updated' : 'added'}`,
        });
        setProjectTitle("");
        setProjectDesc("");
        setProjectImage(null);
        setProjectLiveUrl("");
        setProjectRepoUrl("");
        setEditingProject(null);
        await fetchProjects();
        console.log("Projects fetched after add/update");
      } else {
        throw new Error(`${editingProject ? 'Update' : 'Add'} failed`);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${editingProject ? 'update' : 'add'} project`,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const startEditProject = (project: any) => {
    setEditingProject(project);
    setProjectTitle(project.title);
    setProjectDesc(project.description);
    setProjectLiveUrl(project.liveUrl || "");
    setProjectRepoUrl(project.repoUrl || "");
    setProjectImage(null); // Reset image since we can't pre-fill file input
  };

  const cancelEdit = () => {
    setEditingProject(null);
    setProjectTitle("");
    setProjectDesc("");
    setProjectImage(null);
    setProjectLiveUrl("");
    setProjectRepoUrl("");
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
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white">Admin Panel</h1>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-7 gap-1">
            <TabsTrigger value="profile" className="text-xs">Profile</TabsTrigger>
            <TabsTrigger value="resume" className="text-xs">Resume</TabsTrigger>
            <TabsTrigger value="experience" className="text-xs">Experience</TabsTrigger>
            <TabsTrigger value="education" className="text-xs">Education</TabsTrigger>
            <TabsTrigger value="skills" className="text-xs">Skills</TabsTrigger>
            <TabsTrigger value="projects" className="text-xs">Projects</TabsTrigger>
            <TabsTrigger value="stats" className="text-xs">Stats</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Upload Profile Photo</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <form onSubmit={uploadProfilePhoto} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Select Image</label>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setProfilePhoto(e.target.files?.[0] || null)}
                      />
                      {profilePhoto && (
                        <p className="text-xs text-gray-400 mt-1">Selected: {profilePhoto.name}</p>
                      )}
                    </div>
                    <Button type="submit" disabled={!profilePhoto} className="w-full">
                      Upload Photo
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Current Profile Photo</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col items-center gap-4">
                    {currentProfilePhoto ? (
                      <div className="relative">
                        <img
                          src={currentProfilePhoto}
                          alt="Current profile"
                          className="w-24 h-24 rounded-full object-cover border-2 border-primary/20"
                        />
                        <div className="absolute -bottom-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                          Active
                        </div>
                      </div>
                    ) : (
                      <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center border-2 border-gray-600">
                        <span className="text-gray-400 text-sm">No photo</span>
                      </div>
                    )}
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        if (confirm('Are you sure you want to delete the current profile photo?')) {
                          // deleteProfilePhotoHandler();
                        }
                      }}
                      disabled={!currentProfilePhoto}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Remove Photo
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Resume Tab */}
          <TabsContent value="resume">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Upload Resume</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <form onSubmit={uploadResume} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Select File</label>
                      <Input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => setResume(e.target.files?.[0] || null)}
                      />
                      {resume && (
                        <p className="text-xs text-gray-400 mt-1">Selected: {resume.name}</p>
                      )}
                    </div>
                    <Button type="submit" disabled={!resume} className="w-full">
                      Upload Resume
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Uploaded Resumes ({resumes.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {resumes.length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-gray-400">No resumes uploaded yet</p>
                        <p className="text-xs text-gray-500 mt-1">Upload your first resume to get started</p>
                      </div>
                    ) : (
                      resumes.map((resume: any) => (
                        <div key={resume.id} className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <p className="text-sm font-medium text-green-400">📄 {resume.fileName}</p>
                              <p className="text-xs text-gray-400 mt-1">
                                Size: {(resume.size / 1024).toFixed(2)} KB
                              </p>
                              <p className="text-xs text-gray-400">
                                Uploaded: {new Date(resume.uploadedAt).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <a
                                href={resume.path}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs bg-blue-500/20 text-blue-400 px-3 py-1 rounded hover:bg-blue-500/30 transition-colors"
                              >
                                View
                              </a>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => deleteResume(resume.fileName)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Skills Tab */}
          <TabsContent value="skills">
            <div className="grid gap-6 md:grid-cols-2">
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
                    <Button type="submit" className="w-full">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Skill
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Current Skills ({skills.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {skills.length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-gray-400">No skills added yet</p>
                        <p className="text-xs text-gray-500 mt-1">Add your first skill to get started</p>
                      </div>
                    ) : (
                      skills.map((skill: any) => (
                        <div key={skill.id} className="flex justify-between items-center p-4 bg-slate-800 rounded-lg">
                          <div>
                            <p className="font-medium text-white">{skill.name}</p>
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
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>{editingProject ? "Edit Project" : "Add New Project"}</CardTitle>
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
                      {editingProject && !projectImage && (
                        <p className="text-xs text-blue-400 mt-1">
                          Leave empty to keep current image
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
                    <div className="flex gap-2">
                      <Button type="submit" disabled={uploading} className="flex-1">
                        <Plus className="w-4 h-4 mr-2" />
                        {uploading ? "Saving..." : editingProject ? "Update Project" : "Add Project"}
                      </Button>
                      {editingProject && (
                        <Button type="button" variant="outline" onClick={cancelEdit} className="flex-1">
                          Cancel
                        </Button>
                      )}
                    </div>
                  </form>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Current Projects ({projects.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {projects.length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-gray-400">No projects added yet</p>
                        <p className="text-xs text-gray-500 mt-1">Add your first project to get started</p>
                      </div>
                    ) : (
                      projects.map((project: any) => (
                        <div key={project.id} className="p-4 bg-slate-800 rounded-lg">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <p className="font-medium text-white">{project.title}</p>
                              <p className="text-sm text-gray-400 mt-1">{project.description}</p>
                              <div className="flex gap-2 mt-2">
                                {project.liveUrl && (
                                  <a
                                    href={project.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs bg-blue-500/20 text-blue-400 px-3 py-1 rounded hover:bg-blue-500/30 transition-colors"
                                  >
                                    Live Demo
                                  </a>
                                )}
                                {project.repoUrl && (
                                  <a
                                    href={project.repoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs bg-gray-500/20 text-gray-400 px-3 py-1 rounded hover:bg-gray-500/30 transition-colors"
                                  >
                                    Code
                                  </a>
                                )}
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => startEditProject(project)}
                                disabled={editingProject !== null}
                              >
                                Edit
                              </Button>
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
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Stats Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {stats.map((stat: any) => (
                      <div key={stat.id} className="p-4 bg-slate-800 rounded-lg">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-2xl font-bold text-primary">{stat.value}</p>
                            <p className="text-sm font-medium text-white">{stat.label}</p>
                            {stat.description && (
                              <p className="text-xs text-gray-400 mt-1">{stat.description}</p>
                            )}
                          </div>
                          <div className="text-right">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                // Could add quick edit modal here
                              }}
                            >
                              Edit
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Edit Stats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6 max-h-96 overflow-y-auto">
                    {stats.map((stat: any) => (
                      <div key={stat.id} className="p-4 bg-slate-800 rounded-lg space-y-3">
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
                          className="w-full"
                        >
                          Save Changes
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Experience Tab */}
          <TabsContent value="experience">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Add New Experience</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={addExperience} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Title</label>
                      <Input
                        value={expTitle}
                        onChange={(e) => setExpTitle(e.target.value)}
                        placeholder="e.g., Full Stack Web Development"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Organisation</label>
                      <Input
                        value={expOrganisation}
                        onChange={(e) => setExpOrganisation(e.target.value)}
                        placeholder="e.g., Independent + Internship"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Period</label>
                      <Input
                        value={expPeriod}
                        onChange={(e) => setExpPeriod(e.target.value)}
                        placeholder="e.g., 2024 — Present"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Status</label>
                      <Input
                        value={expStatus}
                        onChange={(e) => setExpStatus(e.target.value)}
                        placeholder="e.g., Pursuing"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Description</label>
                      <textarea
                        value={expDescription}
                        onChange={(e) => setExpDescription(e.target.value)}
                        placeholder="Experience description"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        rows={3}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Skills (comma-separated)</label>
                      <Input
                        value={expSkills}
                        onChange={(e) => setExpSkills(e.target.value)}
                        placeholder="e.g., HTML, CSS, JavaScript"
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Experience
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Current Experiences ({experiences.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {experiences.length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-gray-400">No experiences added yet</p>
                        <p className="text-xs text-gray-500 mt-1">Add your first experience to get started</p>
                      </div>
                    ) : (
                      experiences.map((exp: any) => (
                        <div key={exp.id} className="p-4 bg-slate-800 rounded-lg space-y-3">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <p className="font-medium text-white">{exp.title}</p>
                              <p className="text-sm text-gray-400">{exp.organisation}</p>
                              <p className="text-xs text-primary/80">{exp.period}</p>
                              {exp.status && (
                                <p className="text-xs text-secondary uppercase">{exp.status}</p>
                              )}
                              <p className="text-sm text-gray-300 mt-2">{exp.description}</p>
                              <div className="flex flex-wrap gap-1 mt-2">
                                {exp.skills.map((skill: string) => (
                                  <span key={skill} className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => removeExperience(exp.id)}
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

          {/* Education Tab */}
          <TabsContent value="education">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Add New Education</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={addEducation} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Period</label>
                      <Input
                        value={eduPeriod}
                        onChange={(e) => setEduPeriod(e.target.value)}
                        placeholder="e.g., 2023 — 2027"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Title</label>
                      <Input
                        value={eduTitle}
                        onChange={(e) => setEduTitle(e.target.value)}
                        placeholder="e.g., Bachelor of Technology (CSE AI & ML)"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Institution</label>
                      <Input
                        value={eduInstitution}
                        onChange={(e) => setEduInstitution(e.target.value)}
                        placeholder="e.g., Bansal Institute of Engineering & Technology, Lucknow"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Detail</label>
                      <textarea
                        value={eduDetail}
                        onChange={(e) => setEduDetail(e.target.value)}
                        placeholder="Additional details"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        rows={2}
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Education
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Current Education ({education.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {education.length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-gray-400">No education added yet</p>
                        <p className="text-xs text-gray-500 mt-1">Add your first education entry to get started</p>
                      </div>
                    ) : (
                      education.map((edu: any) => (
                        <div key={edu.id} className="p-4 bg-slate-800 rounded-lg space-y-3">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <p className="font-medium text-white">{edu.title}</p>
                              <p className="text-sm text-gray-400">{edu.institution}</p>
                              <p className="text-xs text-primary/80">{edu.period}</p>
                              {edu.detail && (
                                <p className="text-sm text-gray-300 mt-2">{edu.detail}</p>
                              )}
                            </div>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => removeEducation(edu.id)}
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
        </Tabs>
      </div>
    </div>
  );
}
