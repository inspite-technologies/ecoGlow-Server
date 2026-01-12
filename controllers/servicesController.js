  import FullServices from "../models/servicesSchema.js";

  const createServicesSection = async (req, res) => {
    try {
      const existing = await FullServices.findOne();
      if (existing) {
        return res.status(400).json({ success: false, message: "Use update." });
      }

      // Safety: Ensure files array exists
      const files = req.files || [];

      const {
        heroTitlePart1, heroTitlePart2, introLabel, introMainTitle,
        introDescription, introLongText, gridMainHeading, gridSubheading,
        trustedText, newsletterTitle, newsletterSubtitle,
      } = req.body;

      // 1. Handle Intro Side Image
      const introSideImageFile = files.find(f => f.fieldname === "introSideImage");
      const introSideImage = introSideImageFile ? introSideImageFile.path : null;

      // 2. Handle Banner Image
      const bannerImageFile = files.find(f => f.fieldname === "bannerImage");
      const bannerImage = bannerImageFile ? bannerImageFile.path : null;

      // 3. Handle Services List
      // ⚠️ FIXED: Logic now matches Frontend (uses index, not ID)
      let servicesList = JSON.parse(req.body.servicesList || "[]");
      
      servicesList = servicesList.map((item, index) => {
        // Frontend sends keys like: "serviceImage_0", "serviceImage_1"
        const file = files.find(f => f.fieldname === `serviceImage_${index}`);
        
        if (file) {
            return { ...item, image: file.path };
        }
        return item;
      });

      const fullServices = new FullServices({
        bannerImage,
        heroTitlePart1,
        heroTitlePart2,
        introLabel,
        introMainTitle,
        introDescription,
        introLongText,
        introSideImage,
        gridMainHeading,
        gridSubheading,
        servicesList,
        trustedText,
        newsletterTitle,
        newsletterSubtitle,
      });

      await fullServices.save();
      res.status(201).json({ success: true, data: fullServices });

    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: error.message });
    }
  };

  const updateServicesSection = async (req, res) => {
  try {
    let fullServices = await FullServices.findOne();
    if (!fullServices) fullServices = new FullServices();

    const files = req.files || [];
    const { /* ... other fields ... */ } = req.body;

    // 1. Text Field Updates (Same as your current code)
    // fullServices.heroTitlePart1 = heroTitlePart1; ... etc

    // 2. Single Image Updates
    const introFile = files.find(f => f.fieldname === "introSideImage");
    if (introFile) fullServices.introSideImage = introFile.path;

    const bannerFile = files.find(f => f.fieldname === "bannerImage");
    if (bannerFile) fullServices.bannerImage = bannerFile.path;

    // 3. Reordering & Image Mapping logic
    if (req.body.servicesList) {
      let parsedList = JSON.parse(req.body.servicesList);
      
      fullServices.servicesList = parsedList.map((item) => {
        // Find if there is a file uploaded specifically for THIS card ID
        const file = files.find(f => f.fieldname === `serviceImage_${item.id}`);
        
        return {
          ...item,
          // If a new file exists, use its path, otherwise keep the old path
          image: file ? file.path : item.image 
        };
      });
    }

    await fullServices.save();
    res.status(200).json({ success: true, data: fullServices });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

  const getServicesSection = async (req, res) => {
    try {
      const fullServices = await FullServices.findOne();
      if (!fullServices) {
        return res.status(404).json({ success: false, message: "Services section not found" });
      }
      console.log("services...",fullServices);
      
      
      res.status(200).json({ success: true, data: fullServices });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Failed to fetch Services section", error: error.message });
    }
  };

  export { createServicesSection, updateServicesSection, getServicesSection };