import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "../src/generated/prisma/client";

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.chatMessage.deleteMany();
  await prisma.chatSession.deleteMany();
  await prisma.job.deleteMany();
  await prisma.lead.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.user.deleteMany();
  await prisma.knowledgeDocument.deleteMany();
  await prisma.integration.deleteMany();
  await prisma.tenant.deleteMany();

  const tenant = await prisma.tenant.create({
    data: {
      name: "Cascade Home Services",
      plan: "Professional",
      brandColor: "#2563eb",
    },
  });

  const passwordHash = await bcrypt.hash("prorab123", 10);

  await prisma.user.create({
    data: {
      tenantId: tenant.id,
      email: "admin@cascadehs.com",
      name: "Alex Rivera",
      role: "ADMIN",
      passwordHash,
    },
  });

  const tech1 = await prisma.user.create({
    data: {
      tenantId: tenant.id,
      email: "jordan@cascadehs.com",
      name: "Jordan Lee",
      role: "TECHNICIAN",
      passwordHash,
    },
  });

  const tech2 = await prisma.user.create({
    data: {
      tenantId: tenant.id,
      email: "sam@cascadehs.com",
      name: "Sam Okafor",
      role: "TECHNICIAN",
      passwordHash,
    },
  });

  const customers = await Promise.all(
    [
      { name: "Maria Gonzalez", email: "maria.g@example.com", phone: "555-0101", address: "412 Cedar St, Tacoma, WA" },
      { name: "David Kim", email: "david.kim@example.com", phone: "555-0102", address: "88 Alder Ave, Seattle, WA" },
      { name: "Priya Patel", email: "priya.p@example.com", phone: "555-0103", address: "230 Birch Rd, Bellevue, WA" },
      { name: "Tom Nguyen", email: "tom.n@example.com", phone: "555-0104", address: "17 Maple Ct, Renton, WA" },
    ].map((c) => prisma.customer.create({ data: { tenantId: tenant.id, ...c } }))
  );

  const leadDefs = [
    { name: "Maria Gonzalez", email: "maria.g@example.com", phone: "555-0101", serviceType: "HVAC Repair", channel: "WEB_FORM" as const, status: "WON" as const, customerId: customers[0].id },
    { name: "David Kim", email: "david.kim@example.com", phone: "555-0102", serviceType: "Plumbing", channel: "PHONE" as const, status: "QUALIFIED" as const, customerId: customers[1].id },
    { name: "Priya Patel", email: "priya.p@example.com", phone: "555-0103", serviceType: "Electrical Inspection", channel: "CHAT" as const, status: "CONTACTED" as const, customerId: customers[2].id },
    { name: "Tom Nguyen", email: "tom.n@example.com", phone: "555-0104", serviceType: "Landscaping", channel: "YELP" as const, status: "NEW" as const, customerId: customers[3].id },
    { name: "Rachel Ortiz", email: "rachel.o@example.com", phone: "555-0105", serviceType: "Cleaning", channel: "GOOGLE_LSA" as const, status: "NEW" as const },
    { name: "Kevin Brooks", email: "kevin.b@example.com", phone: "555-0106", serviceType: "HVAC Install", channel: "FACEBOOK" as const, status: "LOST" as const },
  ];

  const leads = await Promise.all(
    leadDefs.map((l) => prisma.lead.create({ data: { tenantId: tenant.id, ...l } }))
  );

  const now = new Date();
  const inHours = (h: number) => new Date(now.getTime() + h * 60 * 60 * 1000);

  await Promise.all([
    prisma.job.create({
      data: {
        tenantId: tenant.id,
        leadId: leads[0].id,
        customerId: customers[0].id,
        technicianId: tech1.id,
        title: "AC Unit Repair",
        serviceType: "HVAC Repair",
        status: "IN_PROGRESS",
        scheduledAt: inHours(1),
        amount: 320,
      },
    }),
    prisma.job.create({
      data: {
        tenantId: tenant.id,
        leadId: leads[1].id,
        customerId: customers[1].id,
        technicianId: tech2.id,
        title: "Kitchen Sink Leak",
        serviceType: "Plumbing",
        status: "SCHEDULED",
        scheduledAt: inHours(4),
        amount: 180,
      },
    }),
    prisma.job.create({
      data: {
        tenantId: tenant.id,
        customerId: customers[2].id,
        technicianId: tech1.id,
        title: "Panel Inspection",
        serviceType: "Electrical",
        status: "SCHEDULED",
        scheduledAt: inHours(26),
        amount: 150,
      },
    }),
    prisma.job.create({
      data: {
        tenantId: tenant.id,
        customerId: customers[3].id,
        technicianId: tech2.id,
        title: "Fall Yard Cleanup",
        serviceType: "Landscaping",
        status: "COMPLETED",
        scheduledAt: inHours(-24),
        amount: 260,
      },
    }),
    prisma.job.create({
      data: {
        tenantId: tenant.id,
        customerId: customers[0].id,
        technicianId: tech1.id,
        title: "Duct Cleaning",
        serviceType: "HVAC Maintenance",
        status: "COMPLETED",
        scheduledAt: inHours(-72),
        amount: 210,
      },
    }),
    prisma.job.create({
      data: {
        tenantId: tenant.id,
        customerId: customers[1].id,
        technicianId: tech2.id,
        title: "Water Heater Flush",
        serviceType: "Plumbing",
        status: "COMPLETED",
        scheduledAt: inHours(-120),
        amount: 175,
      },
    }),
    prisma.job.create({
      data: {
        tenantId: tenant.id,
        customerId: customers[2].id,
        technicianId: tech1.id,
        title: "Outlet Replacement",
        serviceType: "Electrical",
        status: "COMPLETED",
        scheduledAt: inHours(-168),
        amount: 140,
      },
    }),
    prisma.job.create({
      data: {
        tenantId: tenant.id,
        customerId: customers[3].id,
        technicianId: tech2.id,
        title: "Hedge Trimming",
        serviceType: "Landscaping",
        status: "COMPLETED",
        scheduledAt: inHours(-216),
        amount: 190,
      },
    }),
    prisma.job.create({
      data: {
        tenantId: tenant.id,
        customerId: customers[0].id,
        technicianId: tech1.id,
        title: "Thermostat Install",
        serviceType: "HVAC Install",
        status: "COMPLETED",
        scheduledAt: inHours(-288),
        amount: 230,
      },
    }),
    prisma.job.create({
      data: {
        tenantId: tenant.id,
        customerId: customers[1].id,
        technicianId: tech1.id,
        title: "Drain Snaking",
        serviceType: "Plumbing",
        status: "CANCELLED",
        scheduledAt: inHours(-48),
        amount: 130,
      },
    }),
    prisma.job.create({
      data: {
        tenantId: tenant.id,
        customerId: customers[2].id,
        technicianId: tech2.id,
        title: "Fixture Upgrade",
        serviceType: "Electrical",
        status: "SCHEDULED",
        scheduledAt: inHours(50),
        amount: 220,
      },
    }),
  ]);

  const INTEGRATIONS: { key: string; name: string; description: string; category: string; connected: boolean }[] = [
    { key: "salesforce", name: "Salesforce CRM", description: "Manage leads, accounts, and opportunities with seamless AI-powered automation", category: "CRM & Marketing", connected: true },
    { key: "hubspot", name: "HubSpot", description: "Marketing, sales, and service tools unified into one integrated business platform", category: "CRM & Marketing", connected: false },
    { key: "quickbooks", name: "QuickBooks Online", description: "Accounting, invoicing, and expense tracking for small and medium businesses", category: "Finance & Accounting", connected: true },
    { key: "stripe", name: "Stripe Payments", description: "Secure payment processing with subscriptions, invoicing and reporting", category: "Finance & Accounting", connected: true },
    { key: "shopify", name: "Shopify", description: "E-commerce platform to manage products, orders, customers, and online sales channels", category: "E-commerce", connected: false },
    { key: "slack", name: "Slack", description: "Team communication and instant messaging integrated directly into workflows and alerts", category: "Communications", connected: false },
    { key: "teams", name: "Microsoft Teams", description: "Collaboration, chat, and video conferencing with direct business process integration", category: "Communications", connected: false },
    { key: "twilio", name: "Twilio", description: "Programmable messaging, voice, and notifications for customer engagement", category: "Communications", connected: true },
    { key: "odoo", name: "Odoo ERP", description: "Enterprise resource planning covering sales, inventory, finance, and manufacturing", category: "ERP & Resource Management", connected: false },
  ];
  await Promise.all(
    INTEGRATIONS.map((i) => prisma.integration.create({ data: { tenantId: tenant.id, ...i } }))
  );

  await Promise.all([
    prisma.knowledgeDocument.create({
      data: {
        tenantId: tenant.id,
        title: "Service Price List",
        content:
          "HVAC Repair: $150-$400. HVAC Install: $2500-$6000. Plumbing Repair: $120-$350. Electrical Inspection: $150. Cleaning (standard home): $180-$260. Landscaping (yard cleanup): $150-$300. Emergency calls add a $75 surcharge outside business hours (8am-6pm Mon-Sat).",
      },
    }),
    prisma.knowledgeDocument.create({
      data: {
        tenantId: tenant.id,
        title: "Service Area & Hours",
        content:
          "Cascade Home Services covers Tacoma, Seattle, Bellevue, and Renton, WA. Business hours are Monday-Saturday, 8:00 AM - 6:00 PM. Emergency HVAC and plumbing service is available 24/7 with a surcharge.",
      },
    }),
  ]);

  console.log("Seed complete.");
  console.log("Tenant:", tenant.name);
  console.log("Login: admin@cascadehs.com / prorab123 (Admin)");
  console.log("Login: jordan@cascadehs.com / prorab123 (Technician)");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
