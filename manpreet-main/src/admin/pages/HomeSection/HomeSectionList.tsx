// import { useEffect, useState } from "react";
// import {
//   Box,
//   Paper,
//   Tabs,
//   Tab,
//   Typography,
//   Switch,
//   IconButton,
// } from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";
// import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

// import {
//   fetchHomeSections,
//   reorderSections,
//   updateHomeSection,
//   deleteHomeSection,
// } from "../../../Redux Toolkit/Admin/HomeSectionSlice";

// import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";

// // ---------------- Tab Panel ----------------
// interface TabPanelProps {
//   children?: React.ReactNode;
//   value: number;
//   index: number;
// }
// function TabPanel({ children, value, index }: TabPanelProps) {
//   return <div hidden={value !== index}>{value === index && <Box sx={{ p: 3 }}>{children}</Box>}</div>;
// }

// // ---------------- Component ----------------
// export default function HomeSectionList() {
//   const dispatch = useAppDispatch();
//   const { sections, loading } = useAppSelector((state) => state.homeSection);

//   const [activeTab, setActiveTab] = useState(0);

//   const JWT = "YOUR_JWT_HERE"; // 👈 Replace with actual JWT from state or cookie

//   // Fetch sections
//   useEffect(() => {
//     dispatch(fetchHomeSections(JWT));
//   }, [dispatch]);

//   const handleTabChange = (_: any, newValue: number) => setActiveTab(newValue);

//   const onDragEnd = (result: any) => {
//     if (!result.destination) return;

//     const items = Array.from(sections);
//     const [moved] = items.splice(result.source.index, 1);
//     items.splice(result.destination.index, 0, moved);

//     const updated: typeof sections = items.map((item, idx) => ({
//       ...item,
//       order: idx + 1,
//       category: item.category || "", // make sure required fields exist
//       limit: item.limit || 0,
//     }));

//     dispatch(reorderSections(updated));

//     // Update backend
//     updated.forEach((item) =>
//       dispatch(
//         updateHomeSection({
//           sectionId: item._id,
//           data: { order: item.order },
//           jwt: JWT,
//         })
//       )
//     );
//   };

//   const renderList = (data: typeof sections) => {
//     if (loading) return <Typography>Loading...</Typography>;
//     if (!data.length) return <Typography>No sections found</Typography>;

//     return (
//       <DragDropContext onDragEnd={onDragEnd}>
//         <Droppable droppableId="sections">
//           {(provided) => (
//             <div ref={provided.innerRef} {...provided.droppableProps}>
//               {data.map((section, index) => (
//                 <Draggable key={section._id} draggableId={section._id} index={index}>
//                   {(provided) => (
//                     <Paper
//                       ref={provided.innerRef}
//                       {...provided.draggableProps}
//                       {...provided.dragHandleProps}
//                       sx={{
//                         p: 2,
//                         mb: 2,
//                         display: "flex",
//                         justifyContent: "space-between",
//                         alignItems: "center",
//                       }}
//                     >
//                       <Box>
//                         <Typography fontWeight={600}>{section.title}</Typography>
//                         <Typography variant="body2" color="text.secondary">
//                           {section.tag} • {section.layout}
//                         </Typography>
//                       </Box>

//                       <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//                         <Switch
//                           checked={section.isActive}
//                           onChange={() =>
//                             dispatch(
//                               updateHomeSection({
//                                 sectionId: section._id,
//                                 data: { isActive: !section.isActive },
//                                 jwt: JWT,
//                               })
//                             )
//                           }
//                         />

//                         <IconButton
//                           color="error"
//                           onClick={() =>
//                             dispatch(deleteHomeSection({ id: section._id, jwt: JWT }))
//                           }
//                         >
//                           <DeleteIcon />
//                         </IconButton>
//                       </Box>
//                     </Paper>
//                   )}
//                 </Draggable>
//               ))}
//               {provided.placeholder}
//             </div>
//           )}
//         </Droppable>
//       </DragDropContext>
//     );
//   };

//   return (
//     <Box sx={{ width: "100%", p: 2 }}>
//       <Typography variant="h4" sx={{ mb: 3 }}>
//         Home Section Management
//       </Typography>

//       <Paper>
//         <Tabs value={activeTab} onChange={handleTabChange} sx={{ borderBottom: 1, borderColor: "divider" }}>
//           <Tab label="All Sections" />
//           <Tab label="Active Sections" />
//           <Tab label="Inactive Sections" />
//         </Tabs>

//         <TabPanel value={activeTab} index={0}>
//           {renderList(sections)}
//         </TabPanel>
//         <TabPanel value={activeTab} index={1}>
//           {renderList(sections.filter((s) => s.isActive))}
//         </TabPanel>
//         <TabPanel value={activeTab} index={2}>
//           {renderList(sections.filter((s) => !s.isActive))}
//         </TabPanel>
//       </Paper>
//     </Box>
//   );
// }






// src/admin/pages/HomeSection/HomeSectionList.tsx

import { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Tabs,
  Tab,
  Typography,
  Switch,
  IconButton,
  Chip,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

import {
  fetchHomeSections,
  reorderSections,
  updateHomeSection,
  deleteHomeSection,
} from "../../../Redux Toolkit/Admin/HomeSectionSlice";

import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
import HomeSectionForm from "./HomeSectionForm";

interface TabPanelProps {
  children?: React.ReactNode;
  value: number;
  index: number;
}

function TabPanel({ children, value, index }: TabPanelProps) {
  return (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function HomeSectionList() {
  const dispatch = useAppDispatch();
  const { sections, loading } = useAppSelector(
    (state: any) => state.homeSection
  );

  const [activeTab, setActiveTab] = useState(0);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingSection, setEditingSection] = useState<any>(null);

  useEffect(() => {
    dispatch(fetchHomeSections() as any);
  }, [dispatch]);

  const handleTabChange = (_: any, newValue: number) => setActiveTab(newValue);

  // ═══════════════════════════════════════════════
  // EDIT HANDLER
  // ═══════════════════════════════════════════════
  const handleEdit = (section: any) => {
    setEditingSection(section);
    setEditDialogOpen(true);
  };

  const handleEditSuccess = () => {
    setEditDialogOpen(false);
    setEditingSection(null);
    dispatch(fetchHomeSections() as any);
  };

  // ═══════════════════════════════════════════════
  // DRAG & DROP
  // ═══════════════════════════════════════════════
  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(sections);
    const [moved] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, moved);

    const updated = items.map((item: any, idx: number) => ({
      ...item,
      order: idx + 1,
    }));

    dispatch(reorderSections(updated) as any);

    updated.forEach((item: any) =>
      dispatch(
        updateHomeSection({
          sectionId: item._id,
          data: { order: item.order },
        }) as any
      )
    );
  };

  // ═══════════════════════════════════════════════
  // LAYOUT BADGE
  // ═══════════════════════════════════════════════
  const getLayoutBadge = (layout: string) => {
    const config: any = {
      amazon: { label: " slide", color: "#f97316" },
      flipkart: { label: "slide1", color: "#3b82f6" },
      myntra: { label: "slide2", color: "#ec4899" },
      grid: { label: "⊞ Grid", color: "#8b5cf6" },
      slider: { label: "▬ Slider", color: "#10b981" },
    };
    const c = config[layout] || config.amazon;
    return (
      <Chip
        label={c.label}
        size="small"
        sx={{
          bgcolor: `${c.color}20`,
          color: c.color,
          fontWeight: "bold",
          fontSize: 10,
          height: 22,
        }}
      />
    );
  };

  // ═══════════════════════════════════════════════
  // RENDER LIST
  // ═══════════════════════════════════════════════
  const renderList = (data: any[]) => {
    if (loading) return <CircularProgress />;
    if (!data.length)
      return (
        <div className="text-center py-10">
          <p className="text-gray-500">No sections found</p>
        </div>
      );

    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="sections">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {data.map((section, index) => (
                <Draggable
                  key={section._id}
                  draggableId={section._id}
                  index={index}
                >
                  {(provided) => (
                    <Paper
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      sx={{
                        p: 2,
                        mb: 2,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        borderRadius: 2,
                        transition: "all 0.2s",
                        border: "1px solid #e5e7eb",
                        "&:hover": {
                          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                          borderColor: "#c7d2fe",
                        },
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <div {...provided.dragHandleProps}>
                          <DragIndicatorIcon
                            sx={{ color: "#9ca3af", cursor: "grab" }}
                          />
                        </div>

                        <div>
                          <Typography fontWeight={600} fontSize={15}>
                            {section.title}
                          </Typography>
                          <div className="flex items-center gap-2 mt-1">
                            {getLayoutBadge(section.layout)}
                            <Chip
                              label={section.tag}
                              size="small"
                              sx={{
                                bgcolor: "#fef3c7",
                                color: "#92400e",
                                fontSize: 10,
                                height: 22,
                                fontWeight: "bold",
                              }}
                            />
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              Limit: {section.limit}
                            </Typography>
                          </div>
                        </div>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                        }}
                      >
                        <Switch
                          checked={section.isActive}
                          onChange={() =>
                            dispatch(
                              updateHomeSection({
                                sectionId: section._id,
                                data: { isActive: !section.isActive },
                              }) as any
                            )
                          }
                          color="success"
                          size="small"
                        />

                        {/* ✅ EDIT BUTTON */}
                        <IconButton
                          size="small"
                          onClick={() => handleEdit(section)}
                          sx={{
                            bgcolor: "#eef2ff",
                            "&:hover": {
                              bgcolor: "#4f46e5",
                              "& svg": { color: "white" },
                            },
                          }}
                        >
                          <EditIcon
                            sx={{
                              fontSize: 16,
                              color: "#4f46e5",
                              transition: "all 0.2s",
                            }}
                          />
                        </IconButton>

                        <IconButton
                          size="small"
                          color="error"
                          onClick={() =>
                            dispatch(
                              deleteHomeSection({ id: section._id }) as any
                            )
                          }
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </Paper>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
         Home Section Management
      </Typography>

      <Paper sx={{ borderRadius: 2 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          sx={{ borderBottom: 1, borderColor: "divider" }}
        >
          <Tab label={`All (${sections?.length || 0})`} />
          <Tab
            label={`Active (${
              sections?.filter((s: any) => s.isActive).length || 0
            })`}
          />
          <Tab
            label={`Inactive (${
              sections?.filter((s: any) => !s.isActive).length || 0
            })`}
          />
        </Tabs>

        <TabPanel value={activeTab} index={0}>
          {renderList(sections || [])}
        </TabPanel>
        <TabPanel value={activeTab} index={1}>
          {renderList(sections?.filter((s: any) => s.isActive) || [])}
        </TabPanel>
        <TabPanel value={activeTab} index={2}>
          {renderList(sections?.filter((s: any) => !s.isActive) || [])}
        </TabPanel>
      </Paper>

      {/* ═══ EDIT DIALOG ═══ */}
      <Dialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 3 },
        }}
      >
        <DialogTitle
          sx={{
            background: "linear-gradient(90deg, #4f46e5 0%, #7c3aed 100%)",
            color: "white",
            fontWeight: "bold",
          }}
        >
          ✏️ Edit Home Section
        </DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          {editingSection && (
            <HomeSectionForm
              editData={editingSection}
              onSuccess={handleEditSuccess}
            />
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}