
'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';

export function ContactForm() {
  const { toast } = useToast();
  const { t, language } = useTranslation();
  const arrowIcon = language === 'ar' ? <ArrowLeft /> : <ArrowRight />;

  const formSchema = z.object({
    name: z.string().min(2, t('form_error_name')),
    email: z.string().email(t('form_error_email')).optional().or(z.literal('')),
    phone: z.string().optional(),
    budget: z.string().min(1, { message: t('form_error_budget') }),
    propertyType: z.string().min(1, { message: t('form_error_property_type') }),
    details: z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      budget: '',
      propertyType: '',
      details: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const whatsAppNumber = '212602654219';

    let formattedPhone = '';
    if (values.phone) {
        let phone = values.phone.trim();
        if (phone.startsWith('06') || phone.startsWith('07')) {
            phone = `+212${phone.substring(1)}`;
        }
        formattedPhone = `الهاتف: ${phone}`;
    }

    const messageLines = [
      `استفسار جديد من ${values.name}`,
      '------------------',
      values.email ? `البريد الإلكتروني: ${values.email}` : '',
      formattedPhone,
      `الميزانية: ${values.budget}`,
      `النوع المفضل: ${values.propertyType}`,
      values.details ? `\nتفاصيل:\n${values.details}` : '',
    ].filter(Boolean);

    const whatsappMessage = encodeURIComponent(messageLines.join('\n'));
    const whatsappUrl = `https://wa.me/${whatsAppNumber}?text=${whatsappMessage}`;

    window.open(whatsappUrl, '_blank');

    toast({
      title: t('toast_success_title'),
      description: t('toast_success_p'),
    });
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('form_label_name')}</FormLabel>
              <FormControl>
                <Input placeholder={t('form_placeholder_name')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('form_label_email')} ({t('Optional')})</FormLabel>
              <FormControl>
                <Input placeholder={t('form_placeholder_email')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('form_label_phone')}</FormLabel>
              <FormControl>
                <Input placeholder={t('form_placeholder_phone')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="budget"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('form_label_budget')}</FormLabel>
               <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={t('form_placeholder_budget')} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="< $100,000">&lt; $100,000</SelectItem>
                  <SelectItem value="$100,000 - $250,000">$100,000 - $250,000</SelectItem>
                  <SelectItem value="$250,000 - $500,000">$250,000 - $500,000</SelectItem>
                  <SelectItem value="$500,000+">$500,000+</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="propertyType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('form_label_property_type')}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={t('form_placeholder_property_type')} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Coastal">{t('location_coastal')}</SelectItem>
                  <SelectItem value="Inland">{t('location_inland')}</SelectItem>
                  <SelectItem value="Urban">{t('location_urban')}</SelectItem>
                  <SelectItem value="Industrial">{t('location_industrial')}</SelectItem>
                  <SelectItem value="Any">{t('any_type')}</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="details"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('form_label_details')} ({t('Optional')})</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t('form_placeholder_details')}
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" size="lg" className="w-full">
          {t('send_inquiry')} {arrowIcon}
        </Button>
      </form>
    </Form>
  );
}
