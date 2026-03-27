"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

// 默认的联系信息（与数据库初始值一致）
const defaultContact = {
  phone: "+86 198 8490 0913",
  email: "info@gocommtex.com",
  address: "Building B, No.16 Shuanghong Road, Haizhou Street, Haining City, Jiaxing, Zhejiang, China",
  wechat: "commtex_official",
  whatsapp: "+86 198 8490 0913",
  copyright: "© 2024 Companion Matrix Textile Technology Co., Ltd. All rights reserved.",
};

export interface ContactSettings {
  phone: string;
  email: string;
  address: string;
  wechat: string;
  whatsapp: string;
  copyright: string;
}

export function useContactSettings() {
  const [contact, setContact] = useState<ContactSettings>(defaultContact);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContactSettings = async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("settings")
          .select("value")
          .eq("key", "contact")
          .single();

        if (error) {
          console.error("Fetch contact settings error:", error);
          return;
        }

        if (data && data.value) {
          setContact({
            phone: data.value.phone || defaultContact.phone,
            email: data.value.email || defaultContact.email,
            address: data.value.address || defaultContact.address,
            wechat: data.value.wechat || defaultContact.wechat,
            whatsapp: data.value.whatsapp || defaultContact.whatsapp,
            copyright: data.value.copyright || defaultContact.copyright,
          });
        }
      } catch (error) {
        console.error("Fetch contact settings error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContactSettings();
  }, []);

  return { contact, loading };
}
